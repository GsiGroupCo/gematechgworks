<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
 
use App\Models\act_x_mantenimiento_activo;

class act_x_omcsController extends Controller
{
    public function asing(Request $request)
    { 
        try { 
            act_x_mantenimiento_activo::create([
                'actividad_id'     => uniqid(TRUE),
                'taqMantenimiento' => $request -> taqMantenimiento,
                'nombre'           => $request -> nombre,
                'descripcion'      => $request -> descripcion,
                'sistema'          => $request -> sistema,
                'frecuencia'       => $request -> frecuencia,
                'tipofrecuencia'   => $request -> tipofrecuencia,
            ]);
            return redirect()->route('mantenimiento.activo.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('status', 'Actividad agregada');
        } catch (\Throwable $th) {
            return redirect()->route('mantenimiento.activo.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('error', 'Problema agregando actividad');
        }
    }
}
