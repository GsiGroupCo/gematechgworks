<?php

namespace App\Http\Controllers;

use App\Models\activos;
use App\Models\movimientos_x_activos;
use Carbon\Carbon;
use Illuminate\Http\Request;

class movactivosController extends Controller
{
    public function store(Request $request)
    {
        try {
            $fechaActual = Carbon::now();
            $activo = count(activos::where( 'taqActivos', 'LIKE', $request->taqActivos ) -> get());
            $lastData = movimientos_x_activos::where('taqActivos', 'LIKE', $request->taqActivos)->latest('created_at')->first(); 
            $ExistLastData = movimientos_x_activos::where('taqActivos', 'LIKE', $request->taqActivos)->latest('created_at')-> get() -> count(); 
            if( $activo === 1 ) { 
                if( $ExistLastData >= 1 ){  
                    movimientos_x_activos::where('taq_movimiento', 'LIKE', $lastData['taq_movimiento']) -> update([ 
                        'fechaRetorno'   => $fechaActual, 
                    ]);
                    movimientos_x_activos::create([
                        'taq_movimiento' => uniqid(TRUE),
                        'taqActivos'     => $request -> taqActivos,
                        'taqrig'         => $request -> taqrig,
                        'fechaSalida'    => $request -> fechaSalida,
                        'fechaRetorno'   => null,
                        'estado'         => 'SIN RETORNAR',
                        'descripcion'    => $request -> descripcion,
                    ]);
                    return redirect()->route('activos.show', ['activos' => $request -> taqActivos]) ->with('status', 'Movimiento Registrado');
                }else{
                    movimientos_x_activos::create([
                        'taq_movimiento' => uniqid(TRUE),
                        'taqActivos'     => $request -> taqActivos,
                        'taqrig'         => $request -> taqrig,
                        'fechaSalida'    => $request -> fechaSalida,
                        'fechaRetorno'   => null,
                        'estado'         => 'SIN RETORNAR',
                        'descripcion'    => $request -> descripcion,
                    ]);
                    return redirect()->route('activos.show', ['activos' => $request -> taqActivos]) ->with('status', 'Movimiento Registrado');
                } 
            }else{ 
                return redirect()->route('home') -> with('error', 'Activo no encontrado');
            }
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
