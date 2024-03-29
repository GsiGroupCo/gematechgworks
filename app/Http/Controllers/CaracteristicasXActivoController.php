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
                'taq_caracteristica' => uniqid(TRUE),
                'taqActivos'         => $request -> Taq,
                'nombre'             => $request -> nombre,
                'value'              => $request -> value,
            ]);
            return redirect()->route('activos.show', ['activos' => $request->Taq]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('activos.show', ['activos' => $request->Taq]) -> with('error', 'Problemas Añadiendo la caracteristica');
        }
    }

    public function update(Request $request)
    {
        try { 
            caracteristicas_x_activo::where('taq_caracteristica','LIKE',$request ->taqotro) -> update([
                'nombre'  => $request -> nombre,
                'value'   => $request -> valor,
            ]);
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Caracteristica Editada exitosamente');
        } catch (\Throwable $th) { 
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'Problemas Editando la caracteristica');
        }
    }

    public function delete($taqActivos,$taq_caracteristica)
    {
        try {
            caracteristicas_x_activo::where('taq_caracteristica','LIKE',$taq_caracteristica) -> delete();
            return redirect() -> route('activos.show', ['activos' => $taqActivos]) -> with('status', ' Caracteristica Eliminada ');       
        } catch (\Throwable $th) {
            return redirect() -> route('activos.show', ['activos' => $taqActivos]) -> with('error', 'Problemas Elimindo la caracteristica');
        };
    }

}
