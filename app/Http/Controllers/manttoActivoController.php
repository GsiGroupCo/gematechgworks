<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\activos;
use App\Models\User;
use App\Models\mantenimientos;
use App\Models\manttoActivo;
use App\Models\manttoactivoCumplido;
use App\Models\actividades_x_mantenimiento;
use App\Http\Requests\manttoActivoRequest;
use App\Http\Requests\updateTime;
Use Session;

class manttoActivoController extends Controller
{
    public function create($taqActivos)
    {
        $countMantos =  count(mantenimientos::all());
        if($countMantos >= 1){
            return view('mttoActivo/create',[
                'mtto'        => mantenimientos::all(),
                'activo'      => activos::where('taqActivos','LIKE',$taqActivos)->get(),
                'responsable' => User::all()
            ]);
        }
        Session::flash('mttonotfound','No tiene mantenimientos registrados por favor registre un mantenimiento primero.');
        return redirect()->route('mttos.new','mttos');
    }

    public function store(Request $request)
    {
        $timerutina        = actividades_x_mantenimiento::where('taqManto','LIKE',$request->taqManto)->get();
        $CountRutina       = count(actividades_x_mantenimiento::where('taqManto','LIKE',$request->taqManto)->get());
        $mtto              = count(manttoactivo::where([['taqManto','LIKE',$request->taqManto],['taqActivos','LIKE',$request->taqActivos]])->get());

       if($mtto<1){
        if($CountRutina >= 1){
            for ($i = 0; $i < $CountRutina; $i++) {
                manttoactivo::create([
                    'taqmttActivo'   => uniqid('MTTOACTIVO',TRUE),
                    'taqManto'       => $request -> taqManto,
                    'taqsubrutina'   => $timerutina[$i]['taqsubrutina'],
                    'taqActivos'     => $request -> taqActivos,
                    'taqresponsable' => $request -> taqresponsable,
                    'horas'          => $timerutina[$i]['frecuencia'],
                    'horalimite'     => ($timerutina[$i]['frecuencia'] * 40) / 100,
                ]);
            }
            Session::flash('mttoPrevAdd','Se ha asignado el mantenimiento correctamente.');
            return redirect()->route('activos.show',$request -> taqActivos);
           }else{
            Session::flash('submttonotfound','No existen subrutinas de mantenimiento para el mantenimiento seleccionado, por favor primero registrar rutinas de mantenimiento.');
            return redirect()->route('submtto.new',$request -> taqManto);
           }
       }else{
        Session::flash('mttovinculado','Este mantenimiento ya esta vinculado a este activo');
        return redirect()->route('manttoActivo.create',$request -> taqActivos);
       }
    }

    public function update($taqActivos,updateTime $request)
    {
        $activo = activos::where('taqActivos','LIKE',$taqActivos)->get();
        $mttoAactivos = manttoactivo::where('taqActivos','LIKE',$taqActivos)->get();
        $CountRutina  = count(manttoactivo::where('taqActivos','LIKE',$taqActivos)->get());
       if($CountRutina >= 1){
        for ($i = 0; $i < $CountRutina; $i++) {
            $nuevaHora =  $mttoAactivos[$i]['horas'] - $request -> horas;
            $taqruutina= $mttoAactivos[$i]['taqsubrutina'];
            manttoactivo::where('taqsubrutina','LIKE',$taqruutina) -> update([
                'horas' => $nuevaHora,
            ]);
            activos::where('taqActivos','LIKE',$taqActivos)->update([
                'horasuso' => $activo[0]['horasuso'] + $request -> horas,
            ]);
        }
        Session::flash('horasactualizadas','se ha actualizado la hora de cada Mantenimiento');
        return redirect()->route('activos.show',$request -> taqActivos);
       }else{
        Session::flash('mttoactivonotfound','El activo no tiene asignado mantenimientos');
        return redirect()->route('manttoActivo.create',$taqActivos);
       }
    }

    public function Terminate($taqMantoActivo){
        $data = manttoactivo::where('taqmttActivo','LIKE',$taqMantoActivo)->get();
        return view('mttoActivo/finish',[
            'taqMantoActivo' => $taqMantoActivo,
            'responsable'    => user::all(),
            'taqActivos'     => $data[0]['taqActivos'],
        ]);
    }

    public function reset(Request $request)
    {
        $mttoAactivos = manttoactivo::where('taqmttActivo','LIKE',$request -> taqMantoActivo)->get();
        $rutinas      = mttosubrutina::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina'])->get();
        $activo       = activos::where('taqActivos','LIKE',$request -> taqActivos)->get();

        manttoactivoCumplido::create([
            'taqmttActivoCumplidos' => uniqid('MTTOS-ACT-CUMP',TRUE),
            'taqmttActivo'          => $request -> taqMantoActivo,
            'taqresponsable'        => $request -> taqresponsable,
            'taqActivos'            => $request -> taqActivos,
            'horas'                 => $activo[0]['horasuso'],
            'horafaltantes'         => $mttoAactivos[0]['horas'],
        ]);

        manttoactivo::where('taqsubrutina','LIKE',$mttoAactivos[0]['taqsubrutina']) -> update([
            'horas' => $rutinas[0]['frecuencia'],
        ]);

        Session::flash('rutinafin','Mantenimiento'.$rutinas[0]['nombre'] .'Terminado');
        return redirect()->route('activos.show',$mttoAactivos[0]['taqActivos']);
    }
}
