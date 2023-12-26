<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rigs;
use Inertia\Inertia;

class RigsController extends Controller
{
    public function store(Request $request)
    {
        try { 
            $taqrig = uniqid(TRUE);
            rigs::create([
                'taqrig'   => $taqrig,
                'nombre'   => $request -> nombre,
                'longitud' => $request -> longitud,
                'latitud'  => $request -> latitud,
            ]); 
            return redirect()->route('rigs.show', ['rigs' => $taqrig])->with('status', 'Rig Registrado correctamente');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('home')->with('error', 'Problema Registrando Rig');
        }
    }

    public function show($taqrig)
    {
        try {
            $exist = count(rigs::where('taqrig','LIKE',$taqrig)->get());  
            if( $exist === 1 ){  
                return Inertia::render('Rigs',[
                    "Rig" => rigs::where('taqrig','LIKE',$taqrig)->get(),
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'Rig no encontrado');
            }
        } catch (\Throwable $th) {  
            return redirect()->route('home') -> with('error', 'Problema encontrando rig');
        }
    }

    public function update(Request $request)
    {

    }
}
