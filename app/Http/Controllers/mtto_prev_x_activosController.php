<?php

namespace App\Http\Controllers;

use App\Models\act_prev_x_activos;
use Illuminate\Http\Request;

use App\Models\activos;
use App\Models\mantenimientos;
use App\Models\mtto_prev_x_activos;
use App\Models\mtto_prev_x_activo_cump; 
use App\Models\act_x_mantenimiento;
use App\Models\mtto_corr_x_activos;
use App\Models\responsable;

use DateInterval;
use DateTime;
use Inertia\Inertia;

class mtto_prev_x_activosController extends Controller
{

    public function show($taqmttActivo)
    {
        return Inertia::render('Mantenimiento/MantenimientoPrev',[
            'Mtto' => mtto_prev_x_activos::with(
                'Activo',
                'Responsable',
                'Areas',
                'Actividades_Pendientes',
                'Actividades_Finalizadas',
                'Documentos',
                'Mantenimiento'
            )->where('taqmttActivo','LIKE', $taqmttActivo)->get(),
            'Responsables' => responsable::where('estado','LIKE','VIGENTE')->get(),
            'status'  => session('status'),
            'error'   => session('error')
        ]); 
    }

    public function store(Request $request)
    {        
        try {
            $timerutina        = act_x_mantenimiento::where('taqManto','LIKE',$request->taqManto)->get();
            $CountRutina       = count(act_x_mantenimiento::where('taqManto','LIKE',$request->taqManto)->get());
            $mttoCount         = count(mtto_prev_x_activos::where([['taqManto','LIKE',$request->taqManto],['taqActivos','LIKE',$request->taqActivos]])->get());
            $mtto              = mantenimientos::where('taqManto','LIKE',$request->taqManto)->get();
            $taqmttActivo      = uniqid(TRUE);

            if($mttoCount<=1){
                mtto_prev_x_activos::create([
                    'taqmttActivo'   => $taqmttActivo,
                    'taqManto'       => $request -> taqManto,
                    'actividad'      => $mtto[0]['Nombre'],
                    'taqActivos'     => $request -> taqActivos,
                    'taqresponsable' => $request -> taqresponsable,
                    'area'           => $request -> area,
                    'estado'         => 'ASIGNADO',
                    'cantDocs'       => '0',
                    'fecha'          => date("d-m-Y",time()),
                    'fechaFin'       => '',
                ]);

                for ($i = 0; $i < $CountRutina; $i++) {
                    // $ultimantto = strtotime($request->fecha);
                    // $fechaproximo = strtotime(date('d-m-Y',$ultimantto)."+".$timerutina[$i]['frecuencia']." days");
                    // dd($mtto[0]['tipe'] === 'CALENDARIO');
                    if($mtto[0]['tipe'] === 'CALENDARIO'){
                        $fechaObj = new DateTime($request -> ultimomtto);
                        $UltimoMtto = $fechaObj->format('d-m-Y');
                        $fechaObj->add(new DateInterval("P{$timerutina[$i]['frecuencia']}D"));
                        $NuevoMtto = $fechaObj->format('d-m-Y');

                        act_prev_x_activos::create([
                            'taqActPrevact'  => uniqid('AT-PV-'.$request -> taqActivos,TRUE),
                            'taqmttActivo'  => $taqmttActivo,
                            'taqresponsable'=> $request -> taqresponsable,
                            'nombre'        => $timerutina[$i]['nombre'],
                            'estado'        => 'SIN ASIGNAR',
                            'frecuencia'    => $timerutina[$i]['frecuencia'],
                            'fecha'         => $UltimoMtto,
                            'fechaFin'      => $NuevoMtto,
                        ]);
                    }else{
                        $fechaObj = new DateTime($request -> ultimomtto);
                        $UltimoMtto = $fechaObj->format('d-m-Y');
                        $fechaObj->add(new DateInterval("PT{$timerutina[$i]['frecuencia']}H"));
                        $NuevoMtto = $fechaObj->format('d-m-Y');

                        act_prev_x_activos::create([
                            'taqActPrevact'  => uniqid('AT-PV-'.$request -> taqActivos,TRUE),
                            'taqmttActivo'  => $taqmttActivo,
                            'taqresponsable'=> $request -> taqresponsable,
                            'nombre'        => $timerutina[$i]['nombre'],
                            'estado'        => 'SIN ASIGNAR',
                            'frecuencia'    => $timerutina[$i]['frecuencia'],
                            'fecha'         => $UltimoMtto,
                            'fechaFin'      => $NuevoMtto,
                        ]);
                    }
                    
                }

                return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Mantenimiento asignado');
            }else{
                return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'El Mantenimiento ya esta vinculado a este activo');
            }
        } catch (\Throwable $th) {
            
        }
    }

    public function Terminate(Request $request){
        $data = mtto_prev_x_activos::where('taqmttActivo','LIKE',$request-> taqMantoActivo)->get();
        // return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Mantenimiento asignado');
        // return view('mttoActivo/finish',[
        //     'taqMantoActivo' => $request -> taqMantoActivo,
        //     'responsable'    => responsable::all(),
        //     'taqActivos'     => $data[0]['taqActivos'],
        //     'MantoType'      => 'PREVENTIVO'
        // ]);
    }

    public function TerminateMTTO($taqmttActivo){
        mtto_corr_x_activos::where('taqmttActivo','LIKE',$taqmttActivo)->update([
            'estado' =>  'FINALIZADO',
            'fechaFin' => date("d-m-Y",time()),
        ]);
        return redirect()->route('activos.show', [ 'activos' => $taqmttActivo ]) -> with('status', 'Mantenimiento Terminado');
    }

    public function reset(Request $request)
    {
        $mttoAactivos = mtto_prev_x_activos::where('taqmttActivo','LIKE',$request -> taqMantoActivo)->get();
        $rutinas      = act_x_mantenimiento::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina'])->get();
        $activo       = activos::where('taqActivos','LIKE',$request -> taqActivos)->get();
        $frecuencia = strtotime(date('d-m-Y', time())." + ". $rutinas[0]['frecuencia'] ." days");
        mtto_prev_x_activo_cump::create([
            'taqmttActivoCumplidos' => uniqid('MTTOS-ACT-CUMP',TRUE),
            'taqmttActivo'          => $request -> taqMantoActivo,
            'taqresponsable'        => $request -> taqresponsable,
            'taqActivos'            => $request -> taqActivos,
            'fecha'                 => date('d-m-Y', time()),
        ]);
        $fechaproximo = strtotime(date("d-m-Y",time())." + ". $rutinas[0]['frecuencia'] ." days");
        mtto_prev_x_activos::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina']) -> update([
            'fecha' => date("d-m-Y", time()),
            'fechaproximo'   => date("d-m-Y",$fechaproximo),
        ]); 
        return redirect()->route('activos.show', [ 'activos' => $mttoAactivos[0]['taqActivos'] ]) -> with('status', 'Mantenimiento'.$rutinas[0]['nombre'] .'Terminado');
    }
}
