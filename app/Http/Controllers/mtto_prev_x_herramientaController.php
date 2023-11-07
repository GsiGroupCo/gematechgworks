<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\activos;
use App\Models\responsable;
use App\Models\manto;
use App\Models\actividadpreventivaherramienta;
use App\Models\manttopreventivoactivo;
use App\Models\manttocorrectivoactivo;
use App\Models\manttopreventivoactivoCumplido;
use App\Models\manttocorrectivoactivoCumplido;
use App\Models\manttopreventivoHerramienta;
use App\Models\manttoactivoCumplido;
use App\Models\herramienta;
use App\Models\mttosubrutina;
use App\Http\Requests\manttoPrevHerramientaRequest;
use App\Http\Requests\manttoCorrActivoRequest;
use App\Http\Requests\updateTime;
Use Session;

class mtto_prev_x_herramientaController extends Controller
{

    public function show($taqmttHerramienta)
    {
        return view('mttoHerramienta/infoPrev',[
            'profile' => manttopreventivoHerramienta::with('responsable','actividades.responsables')->where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
        ]);
    }

    public function create($taqHer)
    {
        $countMantos =  count(manto::all());
        if($countMantos >= 1){
            return view('mttoHerramienta/createpreventivo',[
                'mtto'        => manto::all(),
                'activo'      => herramienta::where('taqHer','LIKE',$taqHer)->get(),
                'responsable' => responsable::all(),
            ]);
        }
        Session::flash('mttonotfound','No tiene mantenimientos registrados por favor registre un mantenimiento primero.');
        return redirect()->route('mttos.new','mttos');
    }

    public function store(manttoPrevHerramientaRequest $request)
    {
        $timerutina        = mttosubrutina::where('taqManto','LIKE',$request->taqManto)->get();
        $CountRutina       = count(mttosubrutina::where('taqManto','LIKE',$request->taqManto)->get());
        $mttoCount         = count(manttopreventivoHerramienta::where([['taqManto','LIKE',$request->taqManto],['taqHer','LIKE',$request->taqHer]])->get());
        $mtto              = manto::where('taqManto','LIKE',$request->taqManto)->get();

        if($mttoCount!=1){
            manttopreventivoHerramienta::create([
                'taqmttHerramienta' => uniqid('PV'.date("y"),TRUE),
                'taqManto'          => $request -> taqManto,
                'actividad'         => $mtto[0]['Nombre'],
                'taqHer'            => $request -> taqHer,
                'taqresponsable'    => $request -> taqresponsable,
                'area'              => $request -> area,
                'estado'            => 'ASIGNADO',
                'cantDocs'          => '0',
                'fecha'             => date("d-m-Y",time()),
                'fechaFin'          => '',
            ]);

            for ($i = 0; $i < $CountRutina; $i++) {
                $taqActPrevHer = count(actividadpreventivaherramienta::all())+1;
                $ultimantto = strtotime($request->fecha);
                $fechaproximo = strtotime(date('d-m-Y',$ultimantto)."+".$timerutina[$i]['frecuencia']." days");
                actividadpreventivaherramienta::create([
                    'taqActPrevHer'  => uniqid('AT-PV-'.$request -> taqHer,true),
                    'taqmttHerramienta'  => $taqmttHerramienta,
                    'taqresponsable'=> $request -> taqresponsable,
                    'nombre'        => $timerutina[$i]['nombre'],
                    'estado'        => 'SIN ASIGNAR',
                    'frecuencia'    => $timerutina[$i]['frecuencia'],
                    'fecha'         => date('d-m-Y',$ultimantto),
                    'fechaFin'      => date("d-m-Y",$fechaproximo),
                ]);
            }

            Session::flash('mttoPrevAdd','Mantenimiento Agregado Correctamente');
            return redirect()->route('herramientas.show',$request -> taqHer);

        }else{
            Session::flash('mttovinculado','Este mantenimiento ya esta vinculado a este activo');
            return redirect()->route('herramientas.show',$request -> taqHer);
        }
    }

    public function Terminate(Request $request){
        $data = manttopreventivoHerramienta::where('taqmttHerramienta','LIKE',$request-> taqMantoActivo)->get();
        return view('mttoHerramienta/finish',[
            'taqMantoActivo' => $request -> taqMantoActivo,
            'responsable'    => responsable::all(),
            'taqHer'     => $data[0]['taqHer'],
            'MantoType'      => 'PREVENTIVO'
        ]);
    }

    public function TerminateMTTO($taqmttHerramienta){
        manttocorrectivoactivo::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->update([
            'estado' =>  'FINALIZADO',
            'fechaFin' => date("d-m-Y",time()),
        ]);
        Session::flash('MTTOFIN','Mantenimiento terminado');
        return redirect()->route('mantocorrActivo.show',$taqmttHerramienta);
    }

    public function reset(Request $request)
    {
        $mttoAactivos = manttopreventivoHerramienta::where('taqmttHerramienta','LIKE',$request -> taqMantoActivo)->get();
        $rutinas      = mttosubrutina::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina'])->get();
        $activo       = herramienta::where('taqHer','LIKE',$request -> taqHer)->get();
        $frecuencia = strtotime(date('d-m-Y', time())." + ". $rutinas[0]['frecuencia'] ." days");

        manttopreventivoactivoCumplido::create([
            'taqmttHerramientaCumplidos' => uniqid('MTTOS-ACT-CUMP',TRUE),
            'taqmttHerramienta'          => $request -> taqMantoActivo,
            'taqresponsable'        => $request -> taqresponsable,
            'taqHer'                => $request -> taqHer,
            'fecha'                 => date('d-m-Y', time()),
        ]);

        $fechaproximo = strtotime(date("d-m-Y",time())." + ". $rutinas[0]['frecuencia'] ." days");

        manttopreventivoHerramienta::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina']) -> update([
            'fecha' => date("d-m-Y", time()),
            'fechaproximo'   => date("d-m-Y",$fechaproximo),
        ]);

        Session::flash('rutinafin','Mantenimiento'.$rutinas[0]['nombre'] .'Terminado');
        return redirect()->route('herramientas.show',$mttoAactivos[0]['taqHer']);
    }
}
