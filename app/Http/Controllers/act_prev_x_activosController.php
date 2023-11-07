<?php

namespace App\Http\Controllers;

use App\Models\act_prev_x_activos_cump;
use App\Models\mtto_prev_x_activos;
use App\Models\responsable;
use App\Models\act_prev_x_activos;

use Illuminate\Http\Request;
use DateInterval;
use DateTime;

class act_prev_x_activosController extends Controller
{

    public function store(Request $request)
    {
        try {
            $fechaObj = new DateTime($request -> ultimomtto);
            $UltimoMtto = $fechaObj->format('d-m-Y');
            $fechaObj->add(new DateInterval("P{$request -> frecuencia}D"));
            $NuevoMtto = $fechaObj->format('d-m-Y');

            act_prev_x_activos::create([
                'taqActPrevact' => uniqid(TRUE),
                'taqmttActivo'  => $request -> taqmttActivo,
                'taqresponsable'=> $request -> taqresponsable,
                'nombre'        => $request -> actividad,
                'estado'        => 'SIN ASIGNAR',
                'frecuencia'    => $request -> frecuencia,
                'fecha'         => $UltimoMtto,
                'fechaFin'      => $NuevoMtto,
            ]);

            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad agregada correctamente');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('error', 'Problema agregando actividad');
        }
    }
   
    public function update(Request $request)
    {
        try {
            $ultimomtto = strtotime($request->fecha);
            $fechaproximo = strtotime(date('d-m-Y',$ultimomtto)."+".$request -> frecuencia." days");
            act_prev_x_activos::where('taqActPrevact','LIKE',$request -> taqActPrevact)-> update([
                'taqresponsable'=> $request -> taqresponsable,
                'nombre'        => $request -> actividad,
                'frecuencia'    => $request -> frecuencia,
                'fecha'         => date('d-m-Y',$ultimomtto),
                'fechaFin'      => date("d-m-Y",$fechaproximo),
            ]);
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad actualizada correctamente');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('error', 'Problema actualizando atividad');
        }
    }

    public function updateAsignacion(Request $request)
    {
        try {
            act_prev_x_activos::where('taqActPrevact','LIKE',$request -> taqActPrevact)-> update([
                'taqresponsable'=> $request -> taqresponsable,
                'estado'        => 'ASIGNADO',
            ]);
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad asignada correctamente');
        } catch (\Throwable $th) {
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('error', 'Error asignando la actividad');
        }
    }

    public function delete(Request $request){
        try {
            act_prev_x_activos::where('taqActPrevact','LIKE',$request->taqActPrevact)-> delete();
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad eliminada correctamente');
        } catch (\Throwable $th) {
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('error', 'Eliminando actividad correctamente');
        }
        
    }

    public function terminarActividad(Request $request){

        try {
            $ACTIVIDAD = act_prev_x_activos::with('mantenimiento')->where('taqActPrevact','LIKE',$request -> taqActPrevact)->get();
            act_prev_x_activos_cump::create([
                'taqActPrevactcum' => uniqid($ACTIVIDAD[0]['taqActPrevact'].'-CUM-',TRUE),
                'taqActPrevact'    => $ACTIVIDAD[0]['taqActPrevact'],
                'taqmttActivo'     => $ACTIVIDAD[0]['taqmttActivo'],
                'taqresponsable'   => $ACTIVIDAD[0]['taqresponsable'],
                'nombre'           => $ACTIVIDAD[0]['nombre'],
                'estado'           => 'FINALIZADO',
                'frecuencia'       => $ACTIVIDAD[0]['frecuencia'],
                'fecha'            => $ACTIVIDAD[0]['fecha'],
                'fechaFin'         => $ACTIVIDAD[0]['fechaFin'],
            ]);

            $ultimomtto = date('d-m-Y',time());
            $fechaproximo = date('d-m-Y',strtotime($ultimomtto."+".$ACTIVIDAD[0]['frecuencia']." days"));

            act_prev_x_activos::where('taqActPrevact','LIKE',$request -> taqActPrevact)-> update([
                'taqresponsable' => $ACTIVIDAD[0]['mantenimiento']['taqresponsable'],
                'estado'         => 'SIN ASIGNAR',
                'fecha'          => $ultimomtto,
                'fechaFin'       => $fechaproximo,
            ]);
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('error', 'Actividad finalizada');
        } catch (\Throwable $th) {
            return redirect()->route('mtto.prev.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('error', 'Problema finalizando actividad');
        }
    }
}
