<?php

namespace App\Http\Controllers;
 
use App\Models\activos;
use Illuminate\Http\Request;
use App\Models\areas_x_om;
use App\Models\cargos;
use App\Models\empresas;
use App\Models\om;
use App\Models\responsable;
use App\Models\Trabajo; 
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
            $cargos = cargos::where('cargo','LIKE','COORDINADOR DE MANTENIMIENTO')->get();
            if( $exist === 1 ){
                return Inertia::render('Om',[
                    'data' => om::with(
                        'Activos.Activos',
                        'Movimientos',
                        'Documentos',
                        'Documentos_Eliminados.Responsable',
                        'Areas.Area',
                        'Trabajos.Responsable',
                        'Responsable. empresa',
                        ' empresa',
                        'Activos.Activos',
                    ) -> where('taqom', 'LIKE', $taqom)->orderBy('taqom','desc')->paginate(10),
                    'Responsables' => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'Activos' => activos::all(),
                    'status'  => session('status'),
                    'error'   => session('error')
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'OM no encontrada');
            }
        } catch (\Throwable $th) {
            
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
       try { 
            date_default_timezone_set("America/Bogoma");
            $exist = om::where('taqom','LIKE',$request->taqom)->get()->count();
            if($exist === 1){
                $count = count(Trabajo::where('taqom', 'LIKE', $request ->taqom)->get());
                $CantTrabjoFin = count(Trabajo::where([['taqom', 'LIKE', $request ->taqom],['estado', 'LIKE', 'FINALIZADO']])->get());
                if($count == $CantTrabjoFin){
                    om::where('taqom','LIKE',$request ->taqom)-> update([
                        'fechafin' => date('m-d-Y', time()),
                        'horafin'  => date('h:i:s a', time()),
                        'estado'   => 'FINALIZADO',
                    ]); 
                    return redirect()->route('oms.show',['oms' => $request ->taqom]) -> with('status', 'OM FINALIZADA'); 
                }else{
                    return redirect()->route('oms.show',['oms' => $request ->taqom]) -> with('error', 'PROBLEMA FINALIZANDO OM');
                }
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
       } catch (\Throwable $th) { 
            return redirect()->route('oms.show',['oms' => $request ->taqom]) -> with('error', 'PROBLEMA FINALIZANDO OM');
       }
    }
    
}
