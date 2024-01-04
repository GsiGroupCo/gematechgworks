<?php

namespace App\Http\Controllers;

use App\Models\categoria_componentes; 

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaComponenteController extends Controller
{
    public function store(Request $request)
    {   
        try {
            $categoria_id = uniqid(TRUE);
            categoria_componentes::create([
                'categoria_id' => $categoria_id,
                'nombre' => $request -> nombre,
                'taq' => $request -> taq,
            ]);
            return redirect()->route('home') -> with('status', 'Categoria de componente agregada correctamente');
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema agregando la categoria');
        }
    }

    public function show($categoria_id)
    {
        try {
            $exist = count(categoria_componentes::where('categoria_id','LIKE',$categoria_id)->get());
            if( $exist === 1 ){
                return Inertia::render('TipoComponente',[
                    'Categoria' => categoria_componentes::with('Componentes')->where('categoria_id','LIKE',$categoria_id)->get(),
                    'status'      => session('status'),
                    'error'       => session('error')
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'Categoria de componente no encontrada');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando categoria de componente');
        }
    }

    public function update(Request $request)
    { 
        try {
            categoria_componentes::where('categoria_id','LIKE',$request -> Taq)-> update([
                'nombre' => $request -> nombre
            ]);
            return redirect()->route('categorias.componente.show', [ 'type' => $request -> Taq ]) -> with('status', 'Categoria de componente editado correctamente');
        } catch (\Throwable $th) { 
            return redirect()->route('home') -> with('error', 'Problema actualizando la categoria');
        }
    }
}
