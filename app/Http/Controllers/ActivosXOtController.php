<?php

namespace App\Http\Controllers;

use App\Models\activos_x_ot;

use Illuminate\Http\Request;

class ActivosXOtController extends Controller
{
    public function store(Request $request)
    {
        try {
            $duplicated = count(activos_x_ot::where([['taqot','LIKE',$request->taqot],['taqActivos','LIKE',$request->taqActivos]])->get());
            if($duplicated < 1){
                activos_x_ot::create([
                    'taqregisterActOt' => uniqid('',TRUE),
                    'taqot'            => $request ->taqom,
                    'taqActivos'       => $request -> taqActivos,
                ]);
                if($request -> from === 'activos'){
                    return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Orden de trabajo asignada al activo');
                }else if($request -> from === 'ot'){
                    return redirect() -> route('ots.show', ['ots' => $request ->taqom]) -> with('status', 'Activo asignado a la orden de trabajo');
                }
            }else{
                if($request -> from === 'activos'){
                    return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'No se puede asignar dos (2) veces una OT al mismo activo');
                }else if($request -> from === 'ot'){
                    return redirect() -> route('ots.show', ['ots' => $request ->taqom]) -> with('error', 'No se puede asignar dos (2) veces un activo a la mismo ot');
                }
            }
        } catch (\Throwable $th) {
            dd($th);
            if($request -> from === 'activos'){
                return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'No se puede asignar dos (2) veces una OT al mismo activo');
            }else if($request -> from === 'ot'){
                return redirect() -> route('ots.show', ['ots' => $request ->taqom]) -> with('error', 'No se puede asignar dos (2) veces un activo a la mismo ot');
            } 
        }
    }
}
