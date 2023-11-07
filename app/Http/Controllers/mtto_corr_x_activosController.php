<?php

namespace App\Http\Controllers;

use App\Models\mtto_corr_x_activos;
use App\Models\responsable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class mtto_corr_x_activosController extends Controller
{
    public function store(Request $request){

        mtto_corr_x_activos::create([
            'taqmttActivo'   => uniqid('CV-'.date("y"),TRUE),
            'actividad'      => $request -> Actividad,
            'preoperacional' => $request -> Preoperacional,
            'taqActivos'     => $request -> Activo,
            'taqresponsable' => $request -> Responsable,
            'area'           => $request -> Area,
            'estado'         => 'ASIGNADO',
            'fecha'          => date("d-m-Y",time()),
            'fechaFin'       => '',
        ]);
        return redirect()->route('activos.show', ['activos' => $request->Activo]) -> with('status', 'Mantenimiento Agregado');
    }

    public function show($taqmttActivo)
    {
        return Inertia::render('Mantenimiento/MantenimientoCorr',[
            'Mtto' => mtto_corr_x_activos::with(
                'Activo',
                'Responsable',
                'Actividades_Pendientes.Responsables',
                'Actividades_Finalizadas.Responsables',
                'Areas',
                'Documentos'
            )->where('taqmttActivo','LIKE', $taqmttActivo)->get(),
            'Responsables' => responsable::where('estado','LIKE','VIGENTE')->get(),
            'status'  => session('status'),
            'error'   => session('error')
        ]); 
    }
    
    public function Terminate(Request $request){
        $manto = mtto_corr_x_activos::where('taqmttActivo','LIKE',$request -> taqmttActivo ) -> get();
        mtto_corr_x_activos::where('taqmttActivo','LIKE',$request -> taqmttActivo ) -> update([
            'fechaFin' => date("d-m-Y",time()),
            'estado'   => 'FINALIZADO',
        ]);
        return redirect()->route('mtto.corr.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Mantenimiento Terminado');
    }

}
