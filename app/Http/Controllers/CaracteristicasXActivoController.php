<?php

namespace App\Http\Controllers;

use App\Models\caracteristicas_x_activo;

use Illuminate\Http\Request;

class CaracteristicasXActivoController extends Controller
{
    public function store(Request $request)
    {
        try {
            caracteristicas_x_activo::create([
                'taqotro'    => uniqid(TRUE),
                'taqActivos' => $request -> taqActivos,
                'nombre'     => $request -> nombre,
                'value'      => $request -> value,
            ]);
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'Problemas Añadiendo la caracteristica');
        }

    }

    public function update(Request $request)
    {
        try {
            caracteristicas_x_activo::where('taqotro','LIKE',$request ->taqomro) -> update([
                'nombre'  => $request -> nombre,
                'value'   => $request -> valor,
            ]);
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Caracteristica Editada exitosamente');
        } catch (\Throwable $th) {
            
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'Problemas Editando la caracteristica');
        }
    }

    public function delete($taqActivos,$taqotro)
    {
        try {
            caracteristicas_x_activo::where('taqotro','LIKE',$taqotro) -> delete();
            return redirect() -> route('activos.show', ['activos' => $taqActivos]) -> with('status', ' Caracteristica Eliminada ');       
        } catch (\Throwable $th) {
            return redirect() -> route('activos.show', ['activos' => $taqActivos]) -> with('error', 'Problemas Elimindo la caracteristica');
        };
    }

}
