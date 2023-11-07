<?php

namespace App\Http\Controllers;

use App\Models\tipos_componentes;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TiposComponenteController extends Controller
{
    public function store(Request $request)
    {   
        try { 
            $id_tipo = uniqid(TRUE);
            tipos_componentes::create([
                'id_tipo'             => $id_tipo,
                'nombre'              => $request -> nombre,
                'taq_componente_base' => $request -> taq_componente_base,
            ]);
            return redirect()->route('home') -> with('status', 'Categoria de componente agregada correctamente');
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema agregando la categoria');
        }
    }

    public function show($id_tipo)
    {
        try {
            $exist = count(tipos_componentes::where('id_tipo','LIKE',$id_tipo)->get());
            if( $exist === 1 ){
                return Inertia::render('TipoComponente',[
                    'Categoria' => tipos_componentes::with('Componentes')->where('id_tipo','LIKE',$id_tipo)->get(),
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
            tipos_componentes::where('id_tipo','LIKE',$request -> id_tipo)-> update([
                'nombre'              => $request -> nombre,
                'taq_componente_base' => $request -> taq_componente_base,
            ]);
            return redirect()->route([ 'tipos.componente.show', [ 'type' => $request -> id_tipo ] ]) -> with('status', 'Categoria de componente editado correctamente');
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema actualizando la categoria');
        }
    }
}
