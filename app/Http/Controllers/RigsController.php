<?php

namespace App\Http\Controllers;
 
use App\Models\activos;
use Illuminate\Http\Request;
use App\Models\areas_x_ot;
use App\Models\cargos;
use App\Models\empresas;
use App\Models\ot;
use App\Models\responsable;
use App\Models\Trabajo;
use Inertia\Inertia;

class RigsController extends Controller
{
    public function store(Request $request)
    {
        if($request -> clasot == 'GSITECH (OITT)'){
            $clas = 'OITT';
        }else  if($request -> clasot == 'CLIENTES (OT)'){
            $clas = 'OT';
        }else if($request -> clasot == 'GSI (OIT)'){
            $clas = 'OIT';
        }

        $taqot = $clas.$request ->taqom; 
        $ot = count(ot::where('taqot','LIKE',$taqot)->get());
        if($ot == 0)
        {
            $estado     = 'EN PROCESO';
            date_default_timezone_set("America/Bogota");
            ot::create([
                'taqot'          => $taqot,
                'taqempresa'     => $request -> taqempresa,
                'taqresponsable' => $request -> taqresponsable,
                'fechainicio'    => date('m-d-Y', time()),
                'horainicio'     => date('h:i:s a', time()),
                'descripcion'    => $request->descripcion,
                'fechafin'       => '',
                'horafin'        => '',
                'tipo'           => $request -> tipo,
                'clasot'         => $request -> clasot,
                'prioridad'      => $request -> prioridad,
                'estado'         => $estado,
            ]);
            if($request -> MEC){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'MEC',
                ]);
            }

            if($request -> INST){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'INST',
                ]);
            }

            if($request -> METALMEC){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'METALMEC',
                ]);
            }

            if($request -> ELECT){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'ELECT',
                ]);
            }

            if($request -> PINT){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'PINT',
                ]);
            }

            if($request -> EPES){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'EPES',
                ]);
            }

            if($request -> ENNODES){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'ENNODES',
                ]);
            }

            if($request -> SOLD){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'SOLD',
                ]);
            }

            if($request -> ALQ){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'ALQ',
                ]);
            }

            if($request -> FAB){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'FAB',
                ]);
            }
            return redirect()->route('ots.show', [ 'ots' => $taqot ]);
        }else{
            return redirect()->route('home') -> with('error', 'Problema Registrando OT');
        }
    }

    public function empresa_store(Request $request)
    {
        if($request -> clasot == 'GSITECH (OITT)'){
            $clas = 'OITT';
        }else  if($request -> clasot == 'CLIENTES (OT)'){
            $clas = 'OT';
        }else if($request -> clasot == 'GSI (OIT)'){
            $clas = 'OIT';
        }

        $taqot = $clas.$request ->taqom;
        $ot = count(ot::where('taqot','LIKE',$taqot)->get());
        if($ot == 0)
        { 
            date_default_timezone_set("America/Bogota");
            ot::create([
                'taqot'          => $taqot,
                'taqempresa'     => $request -> taqempresa,
                'taqresponsable' => $request -> taqresponsable,
                'fechainicio'    => date('m-d-Y', time()),
                'horainicio'     => date('h:i:s a', time()),
                'descripcion'    => $request->descripcion,
                'fechafin'       => '',
                'horafin'        => '',
                'tipo'           => $request -> tipo,
                'clasot'         => $request -> clasot,
                'prioridad'      => $request -> prioridad,
                'estado'         => 'EN PROCESO',
            ]);
            
            if($request -> MEC){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'MEC',
                ]);
            }

            if($request -> INST){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'INST',
                ]);
            }

            if($request -> METALMEC){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'METALMEC',
                ]);
            }

            if($request -> ELECT){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'ELECT',
                ]);
            }

            if($request -> PINT){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'PINT',
                ]);
            }

            if($request -> EPES){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'EPES',
                ]);
            }

            if($request -> ENNODES){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'ENNODES',
                ]);
            }

            if($request -> SOLD){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'SOLD',
                ]);
            }

            if($request -> ALQ){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'ALQ',
                ]);
            }

            if($request -> FAB){
                areas_x_ot::create([
                    'taqot'           => $taqot,
                    'taqarea'         => 'FAB',
                ]);
            }

            return redirect()->route('ots.show', [ 'ots' => $taqot ]) -> with('status','OT Creada');
        }else{
            return redirect()->route('home') -> with('error', 'Problema Registrando OT');
        }
    }

    public function show($taqot)
    {
        try {
            $exist = count(ot::where('taqot','LIKE',$taqot)->get());
            $cargos = cargos::where('cargo','LIKE','COORDINADOR DE MANTENIMIENTO')->get();
            if( $exist === 1 ){
                return Inertia::render('OT',[
                    'data' => ot::with(
                        'Activos.Activos',
                        'Movimientos',
                        'Documentos',
                        'Documentos_Eliminados.Responsable',
                        'Areas.Area',
                        'Trabajos.Responsable',
                        'Responsable. empresa',
                        ' empresa',
                        'Activos.Activos',
                    ) -> where('taqot', 'LIKE', $taqot)->orderBy('taqot','desc')->paginate(10),
                    'Empresas' => empresas::all(), 
                    'ResponsablesOT' => responsable::where([['taqempresa','LIKE','GSI'],['id_cargo','LIKE',$cargos[0]['id_cargo']],['estado','LIKE','VIGENTE']])->get(), 
                    'Responsables' => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'Activos' => activos::all(),
                    'status'  => session('status'),
                    'error'   => session('error')
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'OT no encontrada');
            }
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('home') -> with('error', 'Problema encontrando OT');
        }
    }

    public function update(Request $request)
    {
        try {  
            ot::where('taqot','LIKE', $request ->taqom)-> update([ 
                'taqresponsable' => $request -> taqresponsable,
                'descripcion'    => $request -> descripcion,
                'tipo'           => $request -> tipo,
                'clasot'         => $request -> clasot,
                'prioridad'      => $request -> prioridad,
            ]);
            $areas = ['MEC', 'INST', 'METALMEC', 'ELECT', 'PINT', 'EPES', 'ENNODES', 'SOLD', 'ALQ', 'FAB'];
            foreach($areas as $area) {
                $exist = areas_x_ot::where([['taqot','LIKE',$request->taqot],['taqarea','LIKE',$area]])->count();
                if($request->has($area) && $request->$area) { 
                    $data = [
                        'taqarea' => $area,
                        'taqot' => $request->taqot,
                    ];
                    if($exist > 0) {
                        areas_x_ot::where([['taqot','LIKE',$request->taqot],['taqarea','LIKE',$area]])->update($data);
                    } else {
                        areas_x_ot::create($data);
                    }
                } elseif ($exist > 0 && (!$request->has($area) || !$request->$area)) {
                    areas_x_ot::where([['taqot', 'LIKE', $request->taqot], ['taqarea', 'LIKE', $area]])->delete();
                }
            }
            return redirect()->route('ots.show',['ots' => $request ->taqom]) -> with('status', 'OT Editada Correctamente');
        } catch (\Throwable $th) { 
            return redirect()->route('ots.show',['ots' => $request ->taqom]) -> with('error', 'Upss.. tenemos un problema editando tu OT '); 
        }
    }

    public function open($taqot)
    {
        date_default_timezone_set("America/Bogota");

        ot::where('taqot','LIKE',$taqot)-> update( [
            'estado'   => 'EN PROCESO'
        ]);
 
        return redirect()->route('ots.show',$taqot);
    }

    public function closed(Request $request)
    {
       try { 
            date_default_timezone_set("America/Bogota");
            $count = count(Trabajo::where('taqot', 'LIKE', $request ->taqom)->get());
            $CantTrabjoFin = count(Trabajo::where([['taqot', 'LIKE', $request ->taqom],['estado', 'LIKE', 'FINALIZADO']])->get());
            if($count == $CantTrabjoFin){
                ot::where('taqot','LIKE',$request ->taqom)-> update([
                    'fechafin' => date('m-d-Y', time()),
                    'horafin'  => date('h:i:s a', time()),
                    'estado'   => 'FINALIZADO',
                ]); 
                return redirect()->route('ots.show',['ots' => $request ->taqom]) -> with('status', 'OT FINALIZADA'); 
            }else{
                return redirect()->route('ots.show',['ots' => $request ->taqom]) -> with('error', 'PROBLEMA FINALIZANDO OT');
            }
       } catch (\Throwable $th) { 
            return redirect()->route('ots.show',['ots' => $request ->taqom]) -> with('error', 'PROBLEMA FINALIZANDO OT');
       }
    } 
}
