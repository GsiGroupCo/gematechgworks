<?php

namespace App\Http\Controllers;

use App\Models\componente_x_activos; 
use Illuminate\Http\Request; 
use Carbon\Carbon;

class ComponentesXActivoController extends Controller
{
    public function store(Request $request)
    {
        try {
            $duplicated = count(componente_x_activos::where([['taqComponente','LIKE',$request->taqComponente],['taqActivos','LIKE',$request->taqActivos]])->get()); 
            if($duplicated < 1){
                componente_x_activos::create([
                    'taq_historial'   => uniqid(TRUE),
                    'taqComponente'   => $request -> taqComponente,
                    'taqActivos'      => $request -> taqActivos,  
                    'estado'          => 'asignado',
                    'fecha_acople'    => Carbon::now(),
                    'fecha_desacople' => null
                ]);
                return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Orden de trabajo asignada al activo');
            }else{
                return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'No se puede asignar dos (2) veces un Componente al mismo activo');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'No se puede asignar dos (2) veces un Componente al mismo activo');
        }
    }
}
