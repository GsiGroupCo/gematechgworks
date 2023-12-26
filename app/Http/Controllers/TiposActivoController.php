<?php

namespace App\Http\Controllers;

use App\Models\tipos_activo;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TiposActivoController extends Controller
{
    public function store(Request $request)
    {   
        try {
            $id_tipo = uniqid(TRUE);
            tipos_activo::create([
                'id_tipo'         => $id_tipo,
                'nombre'          => $request -> nombre,
                'taq_activo_base' => $request -> taq,
            ]);
            return redirect()->route( 'tipos.activo.show', ['type' => $id_tipo] ) -> with('status', 'Tipo de Activo Registrado Correctamente'); 
        } catch (\Throwable $th) {
            
            return redirect()->route('home') -> with('error', 'Problema Registrando el Tipo de Activo');
        }
    }

    public function show($id_tipo)
    {
        try {
            $exist = count(tipos_activo::where('id_tipo','LIKE',$id_tipo)->get());
            if( $exist === 1 ){
                return Inertia::render('TipoActivo',[
                    'TiposActivo' => tipos_activo::with('Activos')->where('id_tipo','LIKE',$id_tipo)->get(),
                    'status'      => session('status'),
                    'error'       => session('error')
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'Categoria de activo no encontrada');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando categoria de activo');
        }

        
    }

    public function update(Request $request)
    { 
        try { 
            tipos_activo::where('id_tipo','LIKE',$request -> Taq)-> update([
                'nombre' => $request -> nombre
            ]);
            return redirect()->route( 'categorias.activo.show', [ 'type' => $request -> Taq ]) -> with('status', 'Categoria actualizada correctamente'); 
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('home') -> with('error', 'Problema Actualizando la categoria');
        }
    }
}
