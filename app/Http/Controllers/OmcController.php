<?php

namespace App\Http\Controllers;

use App\Models\act_x_mantenimiento_componente;
use App\Models\act_x_omc;
use App\Models\componentes;
use App\Models\mantenimientos;
use App\Models\mantenimientos_x_componentes;
use Illuminate\Http\Request; 
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
                    'taqom'           => $taqom,
                    'taqComponente'   => $request -> taqComponente,
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
                $omcExist = count(omc::where('taqom','LIKE',$taqom)->get()); 
                if($omcExist === 1){
                    $CountAct = count(act_x_mantenimiento_componente::where('taqMantenimiento' , 'LIKE' , $request -> taqMantenimiento)->get());
                    $Actividades = act_x_mantenimiento_componente::where('taqMantenimiento' , 'LIKE' , $request -> taqMantenimiento)->get();
                    for ($i = 0; $i < $CountAct; $i++) { 
                        act_x_omc::create([
                            'actividad_id'     => uniqid(TRUE),
                            'taqom'            => $taqom,
                            'taqMantenimiento' => $request -> taqMantenimiento, 
                            'nombre'           => $Actividades[$i]['nombre'], 
                            'descripcion'      => $Actividades[$i]['descripcion'], 
                            'estado'           => 'Pendiente'
                        ]);
                    }
                } 
                return redirect()->route('omcs.show', [ 'omcs' => $taqom ]);
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
            $existomc = count(omc::where('taqom','LIKE',$taqom)->get());  
            if( $existomc === 1 ){
                return Inertia::render('Omc',[
                    'DataOms' => omc::with(
                        'Componente.Historial_uso.Activos',
                        'Responsable',
                        'Documentos',
                        'Documentos_Eliminados',
                        'Actividades.Responsable.Responsable'
                    )->where('taqom', 'LIKE', $taqom)->get(),
                    'MantenimientosList' => mantenimientos_x_componentes::all(),
                    'ResponsablesList' => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'ComponentesList' => componentes::all()
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
            $existomc = omc::where('taqom','LIKE',$request -> taqom)->get()->count();  
            if($existomc === 1 ){
                omc::where('taqom','LIKE', $request ->taqom)-> update([ 
                    'taqresponsable' => $request -> taqresponsable,
                    'descripcion'    => $request -> descripcion,
                    'tipo'           => $request -> tipo, 
                    'prioridad'      => $request -> prioridad,
                ]); 
                return redirect()->route('omcs.show',['omcs' => $request ->taqom]) -> with('status', 'OM Editada Correctamente');
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('omcs.show',['omcs' => $request ->taqom]) -> with('error', 'Upss.. tenemos un problema editando tu OM '); 
        }
    }

    public function open(Request $request)
    {
        try {
            $existomc = omc::where('taqom','LIKE',$request -> taqom)->get()->count(); 
            if($existomc === 1){
                date_default_timezone_set("America/Bogomc");
                omc::where('taqom','LIKE',$request -> taqom)-> update([
                    'estado'   => 'EN PROCESO'
                ]);    
                return redirect()->route('omcs.show',$request -> taqom);
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) { 
            return redirect()->route('omcs.show',['oms' => $request -> taqom]) -> with('error', 'Upss.. Problema Abriendo OM '); 
        }
    }
 
    public function closed(Request $request)
    {
        try {
            $existomc = omc::where('taqom','LIKE',$request -> taqom)->get()->count();
            if($existomc === 1){
                date_default_timezone_set("America/Bogota");
                omc::where('taqom','LIKE',$request -> taqom)-> update( [
                    'estado'   => 'FINALIZADO'
                ]);    
                return redirect()->route('omcs.show',$request -> taqom);
            }else{
                return redirect()->route('home') -> with('error', 'Upss.. OM no encontrada '); 
            }
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('omcs.show',['omcs' => $request -> taqom]) -> with('error', 'Upss.. Problema Abriendo OM '); 
        }
    }
 
}
