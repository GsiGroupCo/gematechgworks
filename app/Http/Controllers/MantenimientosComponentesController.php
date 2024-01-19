<?php

namespace App\Http\Controllers;
 
use App\Models\mantenimientos_x_componentes; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class MantenimientosComponentesController extends Controller
{
 
    public function store(Request $request){ 
        try {  
            mantenimientos_x_componentes::create([
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

    public function Update(Request $request)
    {
        try { 
            mantenimientos_x_componentes::where('taqMantenimiento','LIKE',$request -> taqMantenimiento)-> update([
                'nombre'       => $request -> nombre,
                'descripcion'  => $request -> descripcion,
            ]);
            return redirect()->route('mantenimiento.componente.show', ['taqMantenimiento' => $request->taqMantenimiento]) -> with('status', 'Mantenimiento Actualizado');
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando el mantenimiento'); 
        }
    }
    
    public function show(Request $request)
    {
        try { 
            $exist = count(mantenimientos_x_componentes::where('taqMantenimiento','LIKE',$request -> taqMantenimiento)->get());  
            if( $exist === 1 ){  
                return Inertia::render('Mantenimiento/MttoComponente',[
                    "MttoData" => mantenimientos_x_componentes::with('Actividades')->where('taqMantenimiento','LIKE',$request -> taqMantenimiento)->get()
                ]);
            }else{
                return redirect()->route('home') -> with('error', 'Mantenimiento no encontrado');
            }
        } catch (\Throwable $th) { 
            return redirect()->route('home') -> with('error', 'Problema encontrando mantenimiento');
        }        
    }

}
