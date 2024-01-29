<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
 
use App\Models\act_x_oma;
use App\Models\act_x_oma_x_responsable;

class act_x_omasController extends Controller
{
    public function asing(Request $request)
    { 
        try {
            $exist = count(act_x_oma::where('actividad_id','LIKE',$request->actividad_id)->get());
            if($exist === 1){
                act_x_oma_x_responsable::create([
                    'id_registro_actividad' => uniqid(TRUE),
                    'actividad_id'   => $request -> actividad_id,
                    'taqresponsable' => $request -> taqresponsable
                ]);
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('status', 'Responsable Asignado Correctamente');
            }else{
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Actividad no encontrada');
            }
        } catch (\Throwable $th) { 
            dd($th);
            return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Problema Asignando Responsable');
        }
    }

    public function update(Request $request)
    { 
        try {
            $exist = count(act_x_oma::where('actividad_id','LIKE',$request->actividad_id)->get());
            if($exist === 1){
                act_x_oma::where('actividad_id','LIKE',$request->actividad_id)->update([
                    'nombre'      => $request -> nombre,
                    'descripcion' => $request -> descripcion
                ]);
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('status', 'Actividad Editada correctamente');
            }else{
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Actividad no encontrada');
            }
        } catch (\Throwable $th) {
            return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Problema Editando Actividad');
        }
    }

    public function delete(Request $request)
    { 
        try {
            $exist = count(act_x_oma::where('actividad_id','LIKE',$request->actividad_id)->get());
            if($exist === 1){
                act_x_oma_x_responsable::where('actividad_id','LIKE',$request->actividad_id)->delete();
                act_x_oma::where('actividad_id','LIKE',$request->actividad_id)->delete();
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('status', 'Actividad Eliminada');
            }else{
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Actividad no encontrada');
            }
        } catch (\Throwable $th) { 
            return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Problema Eliminando Actividad');
        }
    }

    public function approbe(Request $request)
    { 
        try {
            $exist = count(act_x_oma::where('actividad_id','LIKE',$request->actividad_id)->get());
            if($exist === 1){ 
                act_x_oma::where('actividad_id','LIKE',$request->actividad_id)->update([
                    'estado' => 'COMPLETADA'
                ]);
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('status', 'Actividad Terminada');
            }else{
                return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Actividad no encontrada');
            }
        } catch (\Throwable $th) { 
            return redirect()->route('omas.show', ['omas' => $request->taqom ]) -> with('error', 'Problema Finalizando Actividad');
        }
    }
}
