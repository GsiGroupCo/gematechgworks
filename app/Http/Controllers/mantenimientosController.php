<?php

namespace App\Http\Controllers;

use App\Models\mantenimientos;
use App\Models\responsable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class mantenimientosController extends Controller
{

    public function store(Request $request)
    {
        mantenimientos::create([
            'taqManto'     => uniqid(TRUE),
            'nombre'       => $request -> nombre,
            'descripcion'  => $request -> Descripcion,
            'tipe'         => $request -> Tipo,
        ]);
        return redirect() -> route('home') -> with('status', 'Mantenimiento Regitrado');
    }

    public function show($taqManto)
    {

        $exist = count(mantenimientos::where('taqManto','LIKE',$taqManto)->get());
        try {
            if($exist === 1){
                return Inertia::render('Mantenimiento/Mantenimiento',[
                    'Mtto' => mantenimientos::with(
                        'Actividades',
                    )->where('taqManto','LIKE', $taqManto)->get(),
                    'Responsables' => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'status'  => session('status'),
                    'error'   => session('error')
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'Mantenimiento no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando mantenimiento'); 
        }

        
    }

    public function update(Request $request)
    {
        try {
            dd($request);
            mantenimientos::where('taqManto','LIKE',$request -> taqManto)-> update([
                'nombre'       => $request -> nombre,
                'descripcion'  => $request -> descripcion,
            ]);
            return redirect()->route('mantenimiento.show', ['taqManto' => $request->taqManto]) -> with('status', 'Mantenimiento Actualizado');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('home') -> with('error', 'Problema encontrando mantenimiento'); 
        }
    }

}
