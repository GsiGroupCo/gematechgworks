<?php

namespace App\Http\Controllers;

use App\Models\movimientos_x_activos; 

use App\Http\Requests\MovActivosRequest;

class movactivosController extends Controller
{
    public function store(MovActivosRequest $request)
    {
        try {
            movimientos_x_activos::create([
                'taqmovactivs' => uniqid(TRUE),
                'taqActivos'   => $request -> taqActivos,
                'taqot'        => $request ->taqom,
                'taqempresa'   => $request -> taqempresa,
                'fechaSalida'  => $request -> fechaSalida,
                'fechaRetorno' => 'SIN RETORNAR',
                'estado'       => 'EN PROCESO',
                'ubicacion'    => $request -> ubicacion,
                'descripcion'  => $request -> descripcion,
            ]);
            return redirect()->route('activos.show', ['activos' => $request -> taqActivos]) ->with('status', 'Movimiento Registrado');
        } catch (\Throwable $th) {
            
            return redirect()->route('activos.show', ['activos' => $request -> taqActivos]) ->with('error', 'Problem Registrando Movimiento');
        }
    }

    public function fin($taqmovactivs)
    {
        try {
            $activo = movimientos_x_activos::where('taqmovactivs','LIKE',$taqmovactivs)->get();
            movimientos_x_activos::where('taqmovactivs','LIKE',$taqmovactivs)->update([
                'estado'=> 'RETORNADO',
                'fechaRetorno' => date("d-m-Y",time()),
            ]);
            return redirect()->route('activos.show', ['activos' => $activo[0]['taqActivos']]) ->with('status', 'Movimiento Finalizado');
        } catch (\Throwable $th) {
            return redirect()->route('activos.show', ['activos' => $activo[0]['taqActivos']]) ->with('error', 'Problemas Finalizando Movimiento');
        }
    }
}
