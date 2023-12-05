<?php

namespace App\Http\Controllers;


use App\Models\cargos;

use Illuminate\Http\Request;

class CargosController extends Controller
{

    public function store(Request $request){
        try {
            cargos::create([
                'id_cargo'    => uniqid('cargoid_',TRUE),
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

    public function show($id_cargo){
        try {
            $cargo = cargos::where('id_cargo', 'LIKE', $id_cargo) -> get();
            return redirect()->route('home');
        } catch (\Throwable $th) {
            return redirect()->route('home');
        }
    }
    
}
