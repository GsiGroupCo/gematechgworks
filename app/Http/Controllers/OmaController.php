<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\act_x_oma;
use App\Models\activos;
use App\Models\act_x_mantenimiento_activo;
use App\Models\mantenimientos_x_activos;
use App\Models\oma; 
use App\Models\responsable;

use Inertia\Inertia;
use DateTime;
use DateInterval;

class OmaController extends Controller
{
    public function store(Request $request)
    {
        try {  
            $taqom = $request -> taqom;
            $om = count(oma::where('taqom','LIKE',$taqom)->get());
            if($om == 0)
            {
                $estado = 'EN PROCESO';
                date_default_timezone_set("America/Bogota");
                oma::create([
                    'taqom'           => $taqom,
                    'taqActivos'      => $request -> taqActivos,
                    'taqresponsable'  => $request -> taqresponsable,
                    'taqMantenimiento'=> $request -> taqMantenimiento,
                    'fechainicio'     => date('m-d-Y', time()),
                    'horainicio'      => date('h:i:s a', time()),
                    'descripcion'     => $request -> descripcion,
                    'fechafin'        => '',
                    'horafin'         => '',
                    'tipo'            => $request -> tipo,
                    'prioridad'       => $request -> prioridad,
                    'estado'          => $estado,
                ]);
                $omaExist = count(oma::where('taqom','LIKE',$taqom)->get());
                $mtto = mantenimientos_x_activos::where('taqMantenimiento' , 'LIKE' , $request -> taqMantenimiento)->get();
                if($omaExist === 1){
                    $CountAct = count(act_x_mantenimiento_activo::where('taqMantenimiento' , 'LIKE' , $request -> taqMantenimiento)->get());
                    $Actividades = act_x_mantenimiento_activo::where('taqMantenimiento' , 'LIKE' , $request -> taqMantenimiento)->get();
                    for ($i = 0; $i < $CountAct; $i++) { 
                        act_x_oma::create([
                            'actividad_id'     => uniqid(TRUE),
                            'taqom'            => $taqom,
                            'taqMantenimiento' => $request -> taqMantenimiento,
                            'taqresponsable'   => $request -> taqresponsable,
                            'nombre'           => $Actividades[$i]['nombre'], 
                            'descripcion'      => $Actividades[$i]['descripcion'], 
                            'estado'           => 'Pendiente'
                        ]);
                    }
                } 
                return redirect()->route('omas.show', [ 'omas' => $taqom ]);
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
            $existOma = count(oma::where('taqom','LIKE',$taqom)->get());  
            if( $existOma === 1 ){
                return Inertia::render('Oma',[
                    'DataOms' => oma::with(
                        'Activos.Historial.Componente',
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
            dd($th);
            return redirect()->route('home') -> with('error', 'Problema encontrando OM');
        }
    }

    public function update(Request $request)
    {
        try {
            $existOma = oma::where('taqom','LIKE',$request -> taqom)->get()->count();  
            if($existOma === 1 ){
                oma::where('taqom','LIKE', $request ->taqom)-> update([ 
                    'taqresponsable' => $request -> taqresponsable,
                    'descripcion'    => $request -> descripcion,
                    'tipo'           => $request -> tipo, 
                    'prioridad'      => $request -> prioridad,
                ]); 
                return redirect()->route('omas.show',['oms' => $request ->taqom]) -> with('status', 'OM Editada Correctamente');
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('omas.show',['oms' => $request ->taqom]) -> with('error', 'Upss.. tenemos un problema editando tu OM '); 
        }
    }

    public function open(Request $request)
    {
        try {
            $existOma = oma::where('taqom','LIKE',$request -> taqom)->get()->count(); 
            if($existOma === 1){
                date_default_timezone_set("America/Bogoma");
                oma::where('taqom','LIKE',$request -> taqom)-> update([
                    'estado'   => 'EN PROCESO'
                ]);    
                return redirect()->route('omas.show',$request -> taqom);
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('omas.show',['oms' => $request -> taqom]) -> with('error', 'Upss.. Problema Abriendo OM '); 
        }
    }
 
    public function closed(Request $request)
    {
        try {
            $existOma = oma::where('taqom','LIKE',$request -> taqom)->get()->count();
            if($existOma === 1){
                date_default_timezone_set("America/Bogoma");
                oma::where('taqom','LIKE',$request -> taqom)-> update( [
                    'estado'   => 'FINALIZADO'
                ]);    
                return redirect()->route('omas.show',$request -> taqom);
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('omas.show',['oms' => $request -> taqom]) -> with('error', 'Upss.. Problema Abriendo OM '); 
        }
    }
 
}
