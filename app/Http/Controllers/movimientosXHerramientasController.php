<?php

namespace App\Http\Controllers;
 
use App\Models\movimientos_x_herramientas;
use Illuminate\Http\Request; 

class movimientosXHerramientasController extends Controller
{
    public function store(Request $request)
    {
        try {
            movimientos_x_herramientas::create([
                'taqMovher'       => uniqid(TRUE),
                'taqHer'          => $request -> taqHer,
                'taqresponsable'  => $request -> taqresponsable,
                'descripcion'     => $request -> descripcion,
                'ubicacion'       => $request -> ubicacion,
                'estado'          => 'EN USO',
            ]);
            return redirect()->route('herramientas.show',['taqHer' => $request -> taqHer]) -> with('status', 'Se ha registrado el movimiento de la herramienta correctamente.');
        } catch (\Throwable $th) { 
            return redirect()->route('herramientas.show',['taqHer' => $request -> taqHer]) -> with('error', 'Problema registrando el movimiento de la herramienta');
        }
    }

    public function retorno(Request $request)
    { 
        try {
            $exist = movimientos_x_herramientas::with('herramienta')->where('taqMovher','LIKE',$request -> taqMovher)->count();
            if($exist>0){
                $mov = movimientos_x_herramientas::with('herramienta')->where('taqMovher','LIKE',$request -> taqMovher)->get();
                movimientos_x_herramientas::where('taqMovher','LIKE',$request -> taqMovher)->update([
                    'estado' => 'Retornado',
                ]);
                if( $request->origin === 'HerramientaPage' ){
                    return redirect()->route('herramientas.show',['taqHer' => $mov[0]['taqHer']]) -> with('status', 'La Herramienta'. '  ' . $mov[0]['herramienta']['nombre'] . '  ' . 'ha retornado al laboratorio.');
                }else{
                    return redirect()->route('home') -> with('status', 'La Herramienta'. '  ' . $mov[0]['herramienta']['nombre'] . '  ' . 'ha retornado al laboratorio.');
                }
            }else{
                return redirect()->route('herramientas.show',['taqHer' => $request -> taqHer]) -> with('error', 'Problema retornando el movimiento de la herramienta');
            }
        } catch (\Throwable $th) {
            return redirect()->route('herramientas.show',['taqHer' => $request -> taqHer]) -> with('error', 'Problema retornando el movimiento de la herramienta');
        }        
    }
}
