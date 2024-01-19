<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
 
use App\Models\act_x_mantenimiento_componente;

class act_x_mantenimientoComponenteController extends Controller
{

    public function store(Request $request)
    {  
        try {
            act_x_mantenimiento_componente::create([
                'actividad_id'     => uniqid(TRUE),
                'taqMantenimiento' => $request -> taqMantenimiento,
                'nombre'           => $request -> nombre,
                'descripcion'      => $request -> descripcion,
                'sistema'          => $request -> sistema,
                'frecuencia'       => $request -> frecuencia,
                'tipofrecuencia'   => $request -> tipofrecuencia,
            ]);
            return redirect()->route('mantenimiento.componente.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('status', 'Actividad agregada');
        } catch (\Throwable $th) {
            return redirect()->route('mantenimiento.componente.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('error', 'Problema agregando actividad');
        }
    }

    public function update(Request $request)
    {
        try {
            act_x_mantenimiento_componente::where('actividad_id','LIKE',$request -> actividad_id)-> update([
                'descripcion'   => $request -> descripcion,
                'nombre'        => $request -> nombre,
                'frecuencia'    => $request -> frecuencia,
                'sistema'       => $request -> sistema,
                'taqComponente' => $request -> taqComponente,
            ]);
            return redirect()->route('mantenimiento.componente.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('status', 'Actividad actualizada');
        } catch (\Throwable $th) { 
            return redirect()->route('mantenimiento.componente.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('status', 'Problema actualizando actividad');
        }
    }

    public function delete(Request $request){
        try {
            act_x_mantenimiento_componente::where('actividad_id','LIKE',$request -> actividad_id )-> delete();
            return redirect() -> route('mantenimiento.componente.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('status', 'Actividad eliminada');
        } catch (\Throwable $th) {
            return redirect() -> route('mantenimiento.componente.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('error', 'Problema eliminando actividad');
        }
    }

}
