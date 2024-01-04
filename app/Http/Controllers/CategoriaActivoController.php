<?php

namespace App\Http\Controllers;

use App\Models\categorias_activo;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaActivoController extends Controller
{
    public function store(Request $request)
    {   
        try {
            $categoria_id = uniqid(TRUE);
            categorias_activo::create([
                'categoria_id'=> $categoria_id,
                'nombre'=> $request -> nombre,
                'taq'=> $request -> taq,
            ]);
            return redirect()->route( 'categorias.activo.show', ['type' => $categoria_id] ) -> with('status', 'Tipo de Activo Registrado Correctamente'); 
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema Registrando el Tipo de Activo');
        }
    }

    public function show($categoria_id)
    {
        try {
            $exist = count(categorias_activo::where('categoria_id','LIKE',$categoria_id)->get());
            if( $exist === 1 ){
                return Inertia::render('TipoActivo',[
                    'TiposActivo' => categorias_activo::with('Activos')->where('categoria_id','LIKE',$categoria_id)->get(),
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
            categorias_activo::where('categoria_id','LIKE',$request -> Taq)-> update([
                'nombre' => $request -> nombre
            ]);
            return redirect()->route( 'categorias.activo.show', [ 'type' => $request -> Taq ]) -> with('status', 'Categoria actualizada correctamente'); 
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema Actualizando la categoria');
        }
    }
}
