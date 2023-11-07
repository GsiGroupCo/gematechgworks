<?php

namespace App\Http\Controllers;

use App\Models\activos;
use App\Models\movactivo;
use App\Models\caracteristicas_x_cliente;
use App\Models\ empresa;
use App\Models\manttoActivo;
use Illuminate\Http\Request;
use App\Http\Requests\ActivoRequest;
use App\Http\Requests\OtroEmpresaRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class CaracteristicasXEmpresaController extends Controller
{
    public function store(OtroEmpresaRequest $request)
    {
        try {
            caracteristicas_x_cliente::create([
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
            $ empresa = caracteristicas_x_cliente::where('taqempresa','LIKE',$request -> taqempresa)->get();
            caracteristicas_x_cliente::where('taqotro','LIKE',$request ->taqomro) -> update([
                'nombre'  => $request -> nombre,
                'value'   => $request -> value,
            ]);
            return redirect()->route('clientes.show', ['taqempresa' => $request->taqempresa]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('clientes.show', ['taqempresa' => $request->taqempresa]) -> with('status', 'Caracteristica Añadida exitosamente');
        }
    }
    
    public function delete($taqotro, $taqempresa)
    {
        try {
            caracteristicas_x_cliente::where('taqotro','LIKE',$taqotro)->delete();
            return redirect()->route('clientes.show', ['taqempresa' => $taqempresa]) -> with('status', 'Caracteristica Añadida exitosamente');
        } catch (\Throwable $th) {
            return redirect()->route('clientes.show', ['taqempresa' => $taqempresa]) -> with('error', 'Problema añadiendo Caracteristica');
        }
    }

}
