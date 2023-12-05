<?php

namespace App\Http\Controllers;
 
use App\Models\caracteristicas_x_empresa; 
use Illuminate\Http\Request; 
use App\Http\Requests\OtroEmpresaRequest; 

class CaracteristicasXEmpresaController extends Controller
{
    public function store(OtroEmpresaRequest $request)
    {
        try {
            caracteristicas_x_empresa::create([
                'taqotro'    => uniqid('OTHER-CAR-EMP-',TRUE),
                'taqempresa' => $request -> taqempresa,
                'nombre'     => $request -> nombre,
                'value'      => $request -> value,
            ]);
            return redirect()->route('clientes.show', ['taqempresa' => $request->taqempresa]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('clientes.show', ['taqempresa' => $request->taqempresa]) -> with('error', 'Problemas Añadiendo la caracteristica');
        }
    }

    public function update(Request $request)
    {
        try {
            $empresa = caracteristicas_x_empresa::where('taqempresa','LIKE',$request -> taqempresa)->get();
            caracteristicas_x_empresa::where('taqotro','LIKE',$request ->taqomro) -> update([
                'nombre'  => $request -> nombre,
                'value'   => $request -> value,
            ]);
            return redirect()->route('clientes.show', ['taqempresa' => $request->taqempresa]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            
            return redirect()->route('clientes.show', ['taqempresa' => $request->taqempresa]) -> with('status', 'Caracteristica Añadida exitosamente');
        }
    }
    
    public function delete($taqotro, $taqempresa)
    {
        try {
            caracteristicas_x_empresa::where('taqotro','LIKE',$taqotro)->delete();
            return redirect()->route('clientes.show', ['taqempresa' => $taqempresa]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('clientes.show', ['taqempresa' => $taqempresa]) -> with('error', 'Problema añadiendo Caracteristica');
        }
    }

}
