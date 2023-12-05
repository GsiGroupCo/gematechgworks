<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use App\Models\Trabajo;


class TrabajoController extends Controller
{
 
    public function store(Request $request)
    {
        try {
            trabajo::create([
                'taqtrabajo'     => uniqid(TRUE),
                'taqot'          => $request ->taqom,
                'descripcion'    => $request -> descripcion,
                'taqresponsable' => $request -> taqresponsable,
                'cantHoras'      => $request -> cantHoras,
                'estado'         => $request -> estado,
            ]);
            return redirect()->route('ots.show', [ 'ots' => $request ->taqom ]) -> with('status','Trabajo Añadido Correctamente');
        } catch (\Throwable $th) {
            
            return redirect()->route('ots.show', [ 'ots' => $request ->taqom ]) -> with('error','Problema Añadiendo Trabajo');
        }
    }

    public function delete(Request $request){
        try {
            dd($request);
            $exist = trabajo::where('taqtrabajo', 'LIKE', $request -> taqtrabajo)->count();
            if($exist>0){
                trabajo::where('taqtrabajo', 'LIKE', $request -> taqtrabajo)->delete();
                return redirect()->route('ots.show', [ 'ots' => $request ->taqom ]) -> with('status','Trabajo Eliminando Correctamente');
            }else{
                return redirect()->route('ots.show', [ 'ots' => $request ->taqom ]) -> with('status','Trabajo Eliminando Correctamente');
            }            
        } catch (\Throwable $th) {
            return redirect()->route('ots.show', [ 'ots' => $request ->taqom ]) -> with('error',' Problema Eliminando Trabajo');
        }
    }

    public function update(Request $request)
    {
       try {  
            $Exist = count(trabajo::where('taqtrabajo','LIKE',$request -> taqtrabajo) -> get() ); 
            if($Exist === 1){
                trabajo::where('taqtrabajo','LIKE',$request -> taqtrabajo)->update([
                    'descripcion'    => $request -> descripcion,
                    'taqresponsable' => $request -> taqresponsable,
                    'cantHoras'      => $request -> cantHoras,
                    'estado'         => $request -> estado,
                ]);
                return redirect()->route('ots.show', [ 'ots' => $request ->taqom ] ) -> with('status','Trabajo Actualizado Correctamente');
            }else{
                return redirect()->route('ots.show', [ 'ots' => $request ->taqom ] ) -> with('error','Trabajo No encontrado ');
            }
       } catch (\Throwable $th) { 
            return redirect()->route('ots.show', [ 'ots' => $request ->taqom ] ) -> with('error','Problema Actualizando Trabajo');
       }
    }

    public function finish(Request $request)
    {
       try {  
            $Exist = count(trabajo::where('taqtrabajo','LIKE',$request -> taqtrabajo) -> get() ); 
            if($Exist >= 1){
                trabajo::where('taqtrabajo','LIKE',$request -> taqtrabajo)->update([ 
                    'estado' => 'FINALIZADO',
                ]);
                return redirect()->route('ots.show', [ 'ots' => $request ->taqom ] ) -> with('status','Trabajo Finalizado Correctamente');
            }else{
                return redirect()->route('ots.show', [ 'ots' => $request ->taqom ] ) -> with('error','Trabajo No encontrado ');
            }
       } catch (\Throwable $th) { 
            return redirect()->route('ots.show', [ 'ots' => $request ->taqom ] ) -> with('error','Problema Finalizado Trabajo');
       }
    }
}
