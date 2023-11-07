<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\activos;
use App\Models\responsable;
use App\Models\manto;
use App\Models\manttohorasactivo;
use App\Models\manttocorrectivoactivo;
use App\Models\manttohorasactivoCumplido;
use App\Models\actividadhoraactivo;
use App\Models\manttocorrectivoactivoCumplido;
use App\Models\manttoactivoCumplido;
use App\Models\mttosubrutina;
use App\Http\Requests\manttoPrevActivoRequest;
use App\Http\Requests\manttoCorrActivoRequest;
use App\Http\Requests\manttoHorasActivoRequest;
use App\Http\Requests\updateTime;
Use Session;

class manttoHorasActivoController extends Controller
{

    public function show($taqmttActivo)
    {
        return view('mttoActivo/infoHora',[
            'profile' => manttohorasactivo::with('responsable','actividades.responsables','Activos')->where('taqmttActivo','LIKE',$taqmttActivo)->get(),
        ]);
    }

    public function create($taqActivos)
    {
        $countMantos =  count(manto::where('tipe','LIKE','HORAS TRABAJADAS')->get());
        if($countMantos >= 1){
            return view('mttoActivo/createHoras',[
                'mtto'        => manto::where('tipe','LIKE','HORAS TRABAJADAS')->get(),
                'activo'      => activos::where('taqActivos','LIKE',$taqActivos)->get(),
                'responsable' => responsable::all(),
            ]);
        }
        Session::flash('mttonotfound','No tiene mantenimientos registrados por favor registre un mantenimiento primero.');
        return redirect()->route('mttos.new','mttos');
    }

    public function store(manttoHorasActivoRequest $request)
    {
        $timerutina        = mttosubrutina::where('taqManto','LIKE',$request->taqManto)->get();
        $CountRutina       = count(mttosubrutina::where('taqManto','LIKE',$request->taqManto)->get());
        $mttoCount         = count(manttohorasactivo::where([['taqManto','LIKE',$request->taqManto],['taqActivos','LIKE',$request->taqActivos]])->get());
        $mtto              = manto::where('taqManto','LIKE',$request->taqManto)->get();

        if($mttoCount<=1){
            $taqmttActivoCount = count(manttohorasactivo::where('taqActivos','LIKE',$request -> taqActivos)->get())+1;
            $taqmttActivo = 'HR-'.$request -> taqActivos.'-'.$taqmttActivoCount.'-'.date("y");
            manttohorasactivo::create([
                'taqmttActivo'   => uniqid('HR-'.date("y"),TRUE),
                'taqManto'       => $request -> taqManto,
                'actividad'      => $mtto[0]['Nombre'],
                'taqActivos'     => $request -> taqActivos,
                'taqresponsable' => $request -> taqresponsable,
                'area'           => $request -> area,
                'estado'         => 'ASIGNADO',
                'cantDocs'       => '0',
            ]);

            manttohorasactivoCumplido::create([
                'taqmttActivoCumplidos' => uniqid('HRC'.date("y"),TRUE),
                'taqmttActivo'   => $taqmttActivo,
                'taqActivos'     => $request -> taqActivos,
                'taqresponsable' => $request -> taqresponsable,
                'ultimoHorometroMTTO' => 0,
                'area'           => $request -> area,
                'estado'         => 'ASIGNADO',
                'cantDocs'       => '0',
            ]);

            for ($i = 0; $i < $CountRutina; $i++) {
                $ultimantto = strtotime($request->fecha);
                $fechaproximo = strtotime(date('d-m-Y',$ultimantto)."+".$timerutina[$i]['frecuencia']." days");
                $Activo = activos::where('taqActivos','LIKE',$request -> taqActivos)->get();
                actividadhoraactivo::create([
                    'taqActividadHora'   => uniqid('AT-HA-'.$request -> taqActivos.'-',TRUE),
                    'taqmttActivo'       => $taqmttActivo,
                    'taqresponsable'     => $request -> taqresponsable,
                    'nombre'             => $timerutina[$i]['nombre'],
                    'frecuencia'         => $timerutina[$i]['frecuencia'],
                    'estado'             => 'SIN ASIGNAR',
                    'ultimoHorometroMTTO'=> $request -> ultimohorometro,
                    'proximoHormetroMTTO'=> $timerutina[$i]['frecuencia'] + $request -> ultimohorometro,
                    'kmFaltantes'        => ($timerutina[$i]['frecuencia'] + $request -> ultimohorometro) - $Activo[0]['horasuso']
                ]);
            }

            Session::flash('mttoPrevAdd','Mantenimiento Agregado Correctamente');
            return redirect()->route('activos.show',$request -> taqActivos);

        }else{
            Session::flash('mttovinculado','Este mantenimiento ya esta vinculado a este activo');
            return redirect()->route('activos.show',$request -> taqActivos);
        }
    }

    public function Terminate(Request $request){
        $data = manttohorasactivo::where('taqmttActivo','LIKE',$request-> taqMantoActivo)->get();
        return view('mttoActivo/finish',[
            'taqMantoActivo' => $request -> taqMantoActivo,
            'responsable'    => responsable::all(),
            'taqActivos'     => $data[0]['taqActivos'],
            'MantoType'      => 'PREVENTIVO'
        ]);
    }

    public function TerminateMTTO($taqmttActivo){
        manttocorrectivoactivo::where('taqmttActivo','LIKE',$taqmttActivo)->update([
            'estado' =>  'FINALIZADO',
            'fechaFin' => date("d-m-Y",time()),
        ]);
        Session::flash('MTTOFIN','Mantenimiento terminado');
        return redirect()->route('mantocorrActivo.show',$taqmttActivo);
    }

    public function reset(Request $request)
    {
        $mttoAactivos = manttohorasactivo::where('taqmttActivo','LIKE',$request -> taqMantoActivo)->get();
        $rutinas      = mttosubrutina::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina'])->get();
        $activo       = activos::where('taqActivos','LIKE',$request -> taqActivos)->get();
        $frecuencia = strtotime(date('d-m-Y', time())." + ". $rutinas[0]['frecuencia'] ." days");
        manttohorasactivoCumplido::create([
            'taqmttActivoCumplidos' => uniqid('MTTOS-ACT-CUMP',TRUE),
            'taqmttActivo'          => $request -> taqMantoActivo,
            'taqresponsable'        => $request -> taqresponsable,
            'taqActivos'            => $request -> taqActivos,
            'fecha'                 => date('d-m-Y', time()),
        ]);
        $fechaproximo = strtotime(date("d-m-Y",time())." + ". $rutinas[0]['frecuencia'] ." days");

        manttohorasactivo::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina']) -> update([
            'fecha' => date("d-m-Y", time()),
            'fechaproximo'   => date("d-m-Y",$fechaproximo),
        ]);

        Session::flash('rutinafin','Mantenimiento'.$rutinas[0]['nombre'] .'Terminado');
        return redirect()->route('activos.show',$mttoAactivos[0]['taqActivos']);
    }
}
