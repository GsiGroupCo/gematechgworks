<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\act_x_mantenimiento;

class act_x_mantenimientoController extends Controller
{

    public function store(Request $request)
    { 
        try {
            act_x_mantenimiento::create([
                'actividad_id'  => uniqid(TRUE),
                'nombre'        => $request -> nombre,
                'frecuencia'    => $request -> frecuencia,
                'tipofrecuencia'=> $request -> tipofrecuencia,
                'sistema'       => $request -> sistema,
                'taqComponente' => $request -> taqComponente,
                'taqManto'      => $request -> taqManto,
            ]);
            return redirect()->route('mantenimiento.show', ['taqManto' => $request->taqManto]) -> with('status', 'Actividad agregada');
        } catch (\Throwable $th) {
            return redirect()->route('mantenimiento.show', ['taqManto' => $request->taqManto]) -> with('error', 'Problema agregando actividad');
        }
    }

    public function update(Request $request)
    {
        try {
            act_x_mantenimiento::where('actividad_id','LIKE',$request -> actividad_id)-> update([
                'nombre'        => $request -> nombre,
                'frecuencia'    => $request -> frecuencia,
                'sistema'       => $request -> sistema,
                'taqComponente' => $request -> taqComponente,
            ]);
            return redirect()->route('mantenimiento.show', ['taqManto' => $request->taqManto]) -> with('status', 'Actividad actualizada');
        } catch (\Throwable $th) { 
            return redirect()->route('mantenimiento.show', ['taqManto' => $request->taqManto]) -> with('status', 'Problema actualizando actividad');
        }
    }

    public function delete(Request $request){
        try {
            act_x_mantenimiento::where('actividad_id','LIKE',$request -> actividad_id )-> delete();
            return redirect() -> route('mantenimiento.show', ['taqManto' => $request->taqManto]) -> with('status', 'Actividad eliminada');
        } catch (\Throwable $th) {
            return redirect() -> route('mantenimiento.show', ['taqManto' => $request->taqManto]) -> with('error', 'Problema eliminando actividad');
        }
    }

}
