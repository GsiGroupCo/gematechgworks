<?php

namespace App\Http\Controllers;

use App\Models\caracteristicas_x_herramientas;

use Illuminate\Http\Request;

class CaracteristicasXComponentesController extends Controller
{
    public function store(Request $request)
    {
        try {
            caracteristicas_x_herramientas::create([
                'taqotro'    => uniqid(TRUE),
                'taqHer'     => $request -> taqHer,
                'nombre'     => $request -> nombre,
                'value'      => $request -> value,
            ]);
            return redirect()->route('herramientas.show', ['taqHer' => $request -> taqHer]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('herramientas.show', ['taqHer' => $request -> taqHer]) -> with('error', 'Problemas Añadiendo la caracteristica');
        }
    }

    public function update(Request $request)
    {
        try {
            $caracteristica = caracteristicas_x_herramientas::where('taqotro','LIKE',$request ->taqomro)->get();
            caracteristicas_x_herramientas::where('taqotro','LIKE',$request ->taqomro) -> update([
                'nombre'  => $request -> nombre,
                'value'   => $request -> value,
            ]);
            return redirect()->route('herramientas.show', ['taqHer' => $caracteristica[0]['taqHer']]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('herramientas.show', ['taqHer' => $caracteristica[0]['taqHer']]) -> with('error', 'Problemas Añadiendo la caracteristica');
        }
    }

    public function delete(Request $request)
    {
        try {
            caracteristicas_x_herramientas::where('taqotro','LIKE',$request ->taqomro) -> delete();
            return redirect() -> route('herramientas.show', ['taqHer' => $request -> taqHer]) -> with('status', ' Caracteristica Eliminada ');       
        } catch (\Throwable $th) {
            return redirect() -> route('herramientas.show', ['taqHer' => $request -> taqHer]) -> with('error', 'Problemas Elimindo la caracteristica');
        };
    }
}
