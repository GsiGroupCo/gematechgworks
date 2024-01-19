<?php

namespace App\Http\Controllers;

use App\Models\activos;
use Illuminate\Http\Request;
use App\Models\oma;
use App\Models\omc;
use App\Models\responsable;
use Inertia\Inertia;

class OmcController extends Controller
{
    
    public function store(Request $request)
    {
        try { 
            $taqom = $request -> taqom;
            $om = count(omc::where('taqom','LIKE',$taqom)->get());
            if($om == 0)
            {
                $estado = 'EN PROCESO';
                date_default_timezone_set("America/Bogota");
                omc::create([
                    'taqom'          => $taqom,
                    'taqComponente'  => $request -> taqComponente,
                    'taqresponsable' => $request -> taqresponsable,
                    'fechainicio'    => date('m-d-Y', time()),
                    'horainicio'     => date('h:i:s a', time()),
                    'descripcion'    => $request->descripcion,
                    'fechafin'       => '',
                    'horafin'        => '',
                    'tipo'           => $request -> tipo,
                    'prioridad'      => $request -> prioridad,
                    'estado'         => $estado,
                ]); 
                return redirect()->route('oms.show', [ 'oms' => $taqom ]);
            }else{
                return redirect()->route('home') -> with('error', 'Problema Registrando OM');
            }
        } catch (\Throwable $th) { 
            return redirect()->route('home') -> with('error', 'Problema Registrando OM'); 
        }
    }
 
    public function show($taqom)
    {
        try { 
            $existOmc = count(omc::where('taqom','LIKE',$taqom)->get()); 
            if( $existOmc === 1 ){
                return Inertia::render('Omc',[
                    'DataOms' => omc::with(
                        'Componente',
                        'Responsable',
                        'Documentos',
                        'Documentos_Eliminados',
                        'Actividades.Responsable'
                    )->where('taqom', 'LIKE', $taqom)->get(),
                    'ResponsablesList' => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'ActivosList' => activos::all()
                ]);
            } 
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando OM');
        }
    }

    public function update(Request $request)
    {
        try {
            $existOmc = omc::where('taqom','LIKE',$request -> taqom)->get()->count();  
            if($existOmc === 1 ){
                omc::where('taqom','LIKE', $request ->taqom)-> update([ 
                    'taqresponsable' => $request -> taqresponsable,
                    'descripcion'    => $request -> descripcion,
                    'tipo'           => $request -> tipo, 
                    'prioridad'      => $request -> prioridad,
                ]); 
                return redirect()->route('oms.show',['oms' => $request ->taqom]) -> with('status', 'OM Editada Correctamente');
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('oms.show',['oms' => $request ->taqom]) -> with('error', 'Upss.. tenemos un problema editando tu OM '); 
        }
    }

    public function open(Request $request)
    {
        try { 
            $existOmc = omc::where('taqom','LIKE',$request -> taqom)->get()->count();
            if($existOmc === 1){
                date_default_timezone_set("America/Bogoma");
                oma::where('taqom','LIKE',$request -> taqom)-> update([
                    'estado'   => 'EN PROCESO'
                ]);    
                return redirect()->route('oms.show',$request -> taqom);
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('oms.show',['oms' => $request -> taqom]) -> with('error', 'Upss.. Problema Abriendo OM '); 
        }
    }

    public function closed(Request $request)
    {
        try {
            $existOmc = omc::where('taqom','LIKE',$request -> taqom)->get()->count();
            if($existOmc === 1){
                date_default_timezone_set("America/Bogoma");
                omc::where('taqom','LIKE',$request -> taqom)-> update( [
                    'estado'   => 'FINALIZADO'
                ]);    
                return redirect()->route('oms.show',$request -> taqom);
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('oms.show',['oms' => $request -> taqom]) -> with('error', 'Upss.. Problema Abriendo OM '); 
        }
    }
    
}
