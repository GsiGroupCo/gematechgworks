<?php

namespace App\Http\Controllers;

use App\Models\mantenimientos_x_activos; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class MantenimientosActivoController extends Controller
{

    public function store(Request $request)
    { 
        try { 
            mantenimientos_x_activos::create([
                'taqMantenimiento' => uniqid(TRUE),
                'categoria_id'     => $request -> categoria_id,
                'Nombre'           => $request -> nombre,
                'tipe'             => $request -> Tipo,
                'descripcion'      => $request -> Descripcion,
            ]);
            return redirect() -> route('home') -> with('status', 'Mantenimiento de Activo Regitrado');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema registrando mantenimiento');
        }
    }

    public function update(Request $request)
    {
        try {  
            mantenimientos_x_activos::where('taqMantenimiento','LIKE',$request -> taqMantenimiento)-> update([
                'nombre'       => $request -> nombre,
                'descripcion'  => $request -> descripcion,
            ]);
            return redirect()->route('mantenimiento.activo.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('status', 'Mantenimiento Actualizado');
        } catch (\Throwable $th) { 
            return redirect()->route('home') -> with('error', 'Problema encontrando el mantenimiento'); 
        }
    }
 
    public function show(Request $request)
    {
        try {
            $exist = count(mantenimientos_x_activos::where('taqMantenimiento','LIKE',$request -> taqMantenimiento)->get());  
            if( $exist === 1 ){  
                return Inertia::render('Mantenimiento/MttoActivo',[
                    "MttoData" => mantenimientos_x_activos::with('Actividades')->where('taqMantenimiento','LIKE',$request -> taqMantenimiento)->get()
                ]);
            }else{
                return redirect()->route('home') -> with('error', 'Activo no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando activo');
        }        
    }

}
