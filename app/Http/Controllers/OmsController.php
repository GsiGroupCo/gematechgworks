<?php

namespace App\Http\Controllers;
 
use App\Models\activos;
use Illuminate\Http\Request;
use App\Models\om;
use App\Models\responsable;
use Inertia\Inertia;

class OmsController extends Controller
{
    public function store(Request $request)
    {
       try { 
            $taqom = $request -> taqom;
            $om = count(om::where('taqom','LIKE',$taqom)->get());
            if($om == 0)
            {
                $estado     = 'EN PROCESO';
                date_default_timezone_set("America/Bogota");
                om::create([
                    'taqom'          => $taqom,
                    'taqActivos'     => $request -> taqActivos,
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
            $exist = count(om::where('taqom','LIKE',$taqom)->get()); 
            if( $exist === 1 ){
                return Inertia::render('Om',[
                    'DataOms' => om::with(
                        'Activos.Historial.Componente',
                        'Responsable',
                        'Documentos',
                        'Documentos_Eliminados',
                        'Mantenimientos.Actividades'
                    )->where('taqom', 'LIKE', $taqom)->get(),
                    'Responsables' => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'Activos' => activos::all()
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'OM no encontrada');
            }
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('home') -> with('error', 'Problema encontrando OM');
        }
    }

    public function update(Request $request)
    {
        try {
            $exist = om::where('taqom','LIKE',$request -> taqom)->get()->count();  
            if($exist === 1 ){
                om::where('taqom','LIKE', $request ->taqom)-> update([ 
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

    public function open($taqom)
    {
        try {
            $exist = om::where('taqom','LIKE',$taqom)->get()->count();
            if($exist === 1){
                date_default_timezone_set("America/Bogoma");
                om::where('taqom','LIKE',$taqom)-> update( [
                    'estado'   => 'EN PROCESO'
                ]);    
                return redirect()->route('oms.show',$taqom);
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('oms.show',['oms' => $taqom]) -> with('error', 'Upss.. Problema Abriendo OM '); 
        }
    }

    public function closed(Request $request)
    {
    }
    
}
