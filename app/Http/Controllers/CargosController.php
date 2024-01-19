<?php

namespace App\Http\Controllers;


use App\Models\cargos;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CargosController extends Controller
{

    public function store(Request $request){
        try {
            cargos::create([
                'id_cargo'    => uniqid(TRUE),
                'cargo'       => $request -> cargo,
                'descripcion' => $request -> descripcion,
            ]);
            return redirect()->route('home') -> with('status', 'Se ha registrado el cargo correctamente.');
        } catch (\Throwable $th) {            
            return redirect()->route('home') -> with('error', 'Problema registrando el cargo');
        }
    }

    public function update(Request $request){
        try {
            cargos::create([
                'cargo'       => $request -> cargo,
                'descripcion' => $request -> descripcion,
            ]);
            return redirect()->route('home') -> with('status', 'Se ha editado el cargo correctamente.');
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema editando el cargo');
        }
    }

    public function show($cargo_id){
        try {  
            $exist = count(cargos::where('cargo_id', 'LIKE', $cargo_id) -> get()); 
            if( $exist === 1 ){ 
                return Inertia::render('Cargo',[
                    'Cargos' => cargos::with('Responsables')->where('cargo_id', 'LIKE', $cargo_id)->get()
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'Cargo no encontrado');
            }
            return redirect()->route('home');
        } catch (\Throwable $th) {
            return redirect()->route('home');
        }
    } 
}
