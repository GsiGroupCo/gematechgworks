<?php

namespace App\Http\Controllers;

use App\Models\caracteristicas_x_componentes; 
use Illuminate\Http\Request;

class CaracteristicasXComponentesController extends Controller
{
    public function store(Request $request)
    {
        try {
            caracteristicas_x_componentes::create([
                'taq_caracteristica' => uniqid(TRUE),
                'taqComponente'      => $request -> taqComponente,
                'nombre'             => $request -> nombre,
                'value'              => $request -> value,
            ]);
            return redirect()->route('componentes.show', ['componentes' => $request -> taqComponente]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('componentes.show', ['componentes' => $request -> taqComponente]) -> with('error', 'Problemas Añadiendo la caracteristica');
        }
    }

    public function update(Request $request)
    {
        try {
            $caracteristica = caracteristicas_x_componentes::where('taq_caracteristica','LIKE',$request ->taq_caracteristica)->get();
            caracteristicas_x_componentes::where('taq_caracteristica','LIKE',$request ->taqomro) -> update([
                'nombre'  => $request -> nombre,
                'value'   => $request -> value,
            ]);
            return redirect()->route('componentes.show', ['componentes' => $caracteristica[0]['taqComponente']]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('componentes.show', ['componentes' => $caracteristica[0]['taqComponente']]) -> with('error', 'Problemas Añadiendo la caracteristica');
        }
    }

    public function delete(Request $request)
    {
        try {
            caracteristicas_x_componentes::where('taq_caracteristica','LIKE',$request ->taq_caracteristica) -> delete();
            return redirect() -> route('componentes.show', ['componentes' => $request -> taqComponente]) -> with('status', ' Caracteristica Eliminada ');       
        } catch (\Throwable $th) {
            return redirect() -> route('componentes.show', ['componentes' => $request -> taqComponente]) -> with('error', 'Problemas Elimindo la caracteristica');
        };
    }
}
