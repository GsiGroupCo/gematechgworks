<?php

namespace App\Http\Controllers;

use App\Models\mantenimientos_x_om;
use Illuminate\Http\Request;

class mantenimientosController extends Controller
{

    public function store(Request $request)
    {
        mantenimientos_x_om::create([
            'taqmantenimiento' => uniqid(TRUE),
            'taqom'            => $request -> taqom,
            'Nombre'           => $request -> nombre,
            'Descripcion'      => $request -> Descripcion,
            'tipe'             => $request -> Tipo
        ]);
        return redirect() -> route('home') -> with('status', 'Mantenimiento Regitrado');
    }

    public function update(Request $request)
    {
        try { 
            mantenimientos_x_om::where('taqmantenimiento','LIKE',$request -> taqmantenimiento)-> update([
                'nombre'       => $request -> nombre,
                'descripcion'  => $request -> descripcion,
            ]);
            return redirect()->route('om.show', ['taqom' => $request->taqom]) -> with('status', 'Mantenimiento Actualizado');
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando mantenimiento'); 
        }
    }

}
