<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\mantenimientos;
use App\Models\user;
use App\Models\herramienta;
use App\Models\mtto_prev_x_herramienta_cump;
use App\Http\Requests\updateTime;
use App\Http\Requests\mttoHerramientaRequest;
use App\Models\act_x_mantenimiento;
use App\Models\mtto_prev_x_herramienta;
Use Session;

class mtto_prev_x_herramientaController extends Controller
{
    public function create($taqHer)
    {
        $countMantos =  count(mantenimientos::all());
        if($countMantos >= 1){
            return view('mttoHer/create',[
                'mtto'        => mantenimientos::all(),
                'herramienta' => herramienta::where('taqHer','LIKE',$taqHer)->get(),
                'responsable' => User::all()
            ]);
        }
        return redirect()->route('activos.show', [ 'activos' => $mttoAactivos[0]['taqActivos'] ]) -> with('status', 'Mantenimiento'.$rutinas[0]['nombre'] .'Terminado');
    }

    public function store(mttoHerramientaRequest $request)
    {
        $timerutina        = act_x_mantenimiento::where('taqManto','LIKE',$request->taqManto)->get();
        $CountRutina       = count(act_x_mantenimiento::where('taqManto','LIKE',$request->taqManto)->get());
        $mtto              = count(mtto_prev_x_herramienta::where([['taqManto','LIKE',$request->taqManto],['taqHer','LIKE',$request->taqHer]])->get());

       if($mtto<1){
        if($CountRutina >= 1){
            for ($i = 0; $i < $CountRutina; $i++) {
                mtto_prev_x_herramienta::create([
                    'taqmttHerramienta'=>  uniqid('MTTOHERR-',TRUE),
                    'taqManto'         =>  $request -> taqManto,
                    'taqsubrutina'     =>  $timerutina[$i]['taqsubrutina'],
                    'taqHer'           =>  $request -> taqHer,
                    'taqresponsable'   =>  $request -> taqresponsable,
                    'horas'            =>  $timerutina[$i]['frecuencia'],
                    'horalimite'       =>  ($timerutina[$i]['frecuencia'] * 40) / 100,
                ]);
            }
            Session::flash('mttoPrevAdd','Se ha asignado el mantenimiento correctamente.');
            return redirect()->route('herramientas.show',$request -> taqHer);
           }else{
            Session::flash('submttonotfound','No existen subrutinas de mantenimiento para el mantenimiento seleccionado, por favor primero registrar rutinas de mantenimiento.');
            return redirect()->route('submtto.new',$request -> taqManto);
           }
       }else{
        Session::flash('mttovinculado','Este mantenimiento ya esta vinculado a esta herramienta');
        return redirect()->route('manttoActivo.create',$request -> taqHer);
       }
    }

    public function update($taqHer,updateTime $request)
    {
        $herramientas = herramienta::where('taqHer','LIKE',$taqHer)->get();
        $mantoHerramientas = mtto_prev_x_herramienta::where('taqHer','LIKE',$taqHer)->get();
        $CountRutina  = count(mtto_prev_x_herramienta::where('taqHer','LIKE',$taqHer)->get());
       if($CountRutina >= 1){
        for ($i = 0; $i < $CountRutina; $i++) {
            $nuevaHora =  $mantoHerramientas[$i]['horas'] - $request -> horas;
            $taqruutina= $mantoHerramientas[$i]['taqsubrutina'];
            mtto_prev_x_herramienta::where('taqsubrutina','LIKE',$taqruutina) -> update([
                'horas' => $nuevaHora,
            ]);
            herramienta::where('taqHer','LIKE',$taqHer)->update([
                'horasuso' => $herramientas[0]['horasuso'] + $request -> horas,
            ]);
        }
        Session::flash('horasactualizadas','se ha actualizado la hora de cada mantenimiento');
        return redirect()->route('herramientas.show',$request->taqHer);
       }else{
        Session::flash('mttoactivonotfound','El activo no tiene asignado mantenimientos');
        return redirect()->route('mantoHer.create',$taqHer);
       }
    }

    public function Terminate($taqMantoHerramienta){
        $data = mtto_prev_x_herramienta::where('taqmttHerramienta','LIKE',$taqMantoHerramienta)->get();
        return view('mttoHer/finish',[
            'taqMantoHerramienta' => $taqMantoHerramienta,
            'responsable'    => user::all(),
            'taqHer'     => $data[0]['taqHer'],
        ]);

    }

    public function reset(Request $request)
    {
        $mantoherramienta = mtto_prev_x_herramienta::where('taqmttHerramienta','LIKE',$request -> taqMantoHerramienta)->get();
        $rutinas      = act_x_mantenimiento::where('taqsubrutina','LIKE',$mantoherramienta[0]['taqsubrutina'])->get();
        $herramienta  = herramienta::where('taqHer','LIKE',$request -> taqHer)->get();
        mtto_prev_x_herramienta_cump::create([
            'taqmttHerramientaCumplidos' => uniqid('MTTOS-HERRAMIENTA-CUMP',TRUE),
            'taqmttHerramienta'          => $request -> taqMantoHerramienta,
            'taqresponsable'             => $request -> taqresponsable,
            'taqHer'                     => $request -> taqHer,
            'horas'                      => $herramienta[0]['horasuso'],
            'horafaltantes'              => $mantoherramienta[0]['horas'],
        ]);
        mtto_prev_x_herramienta::where('taqsubrutina','LIKE',$mantoherramienta[0]['taqsubrutina']) -> update([
            'horas' => $rutinas[0]['frecuencia'],
        ]);
        Session::flash('horasactualizadas','Mantenimiento'.$rutinas[0]['nombre'] .'Terminado');
        return redirect()->route('herramientas.show',$mantoherramienta[0]['taqHer']);
    }
}
