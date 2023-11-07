<?php

namespace App\Http\Controllers;

use App\Models\manttocorrectivoactivo;
use App\Models\act_corr_x_activo;
use App\Models\act_corr_x_activo_cump;
use Illuminate\Http\Request;
use App\Http\Requests\ActividadCorrectivaActivoRequest;
use App\Http\Requests\ActivoRequest;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class act_corr_x_activosController extends Controller
{

    public function store(Request $request)
    {
        act_corr_x_activo::create([
            'taqActCorrAct' => uniqid(TRUE),
            'taqmttActivo'  => $request -> taqmttActivo,
            'taqresponsable'=> $request -> taqresponsable,
            'nombre'        => $request -> actividad,
            'estado'        => 'ASIGNADO',
            'fecha'         => date('d-m-Y', time()),
            'fechaFin'      => 'AUN EN PROCESO'
        ]);
        return redirect()->route('mtto.corr.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad registrada');
    }

    public function update(Request $request)
    {
        act_corr_x_activo::where('taqActCorrAct','LIKE',$request -> taqActCorrAct)-> update([
            'taqresponsable'=> $request -> taqresponsable,
            'nombre'        => $request -> actividad,
            'estado'        => $request -> estado,
        ]);
        return redirect()->route('mtto.corr.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad actualizada');
    }

    public function delete(Request $request){
        act_corr_x_activo::where('taqActCorrAct','LIKE',$request->taqActCorrAct)-> delete();
        return redirect()->route('mtto.corr.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad eliminada');
    }

    // public function Asiganaciontarea($taqmttActivo,$taqActCorrAct){

    //     return view('actividades/AsignarResponsableActividadCorrectivaActivo',[
    //         'manto' => manttocorrectivoactivo::with('Activos')->where('taqmttActivo','LIKE',$taqmttActivo)->get(),
    //         'respon' => responsable::all(),
    //         'taqActCorrAct' => $taqActCorrAct,
    //         'taqmttActivo' =>$taqmttActivo,
    //     ]);
    // }

    // public function updateAsigancion(Request $request)
    // {
    //     act_corr_x_activo::where('taqActCorrAct','LIKE',$request -> taqActCorrAct)-> update([
    //         'taqresponsable'=> $request -> taqresponsable,
    //         'estado'        => 'ASIGNADO',
    //     ]);

    //     Session::flash('actividadUpdate','Se ha actualizado la actividad correctamente.');
    //     return redirect()->route('mantocorrActivo.show',$request -> taqmttActivo);
    // }

    public function end(Request $request)
    {
        try {
            $data = act_corr_x_activo::where('taqActCorrAct','LIKE',$request -> taqActCorrAct) -> get();
            act_corr_x_activo_cump::create([
                'act_corr_act'   => uniqid(TRUE),
                'taqmttActivo'   => $data[0]['taqmttActivo'], 
                'taqresponsable' => $data[0]['taqresponsable'],
                'nombre'         => $data[0]['nombre'],
                'estado'         => 'FINALIZADO',
                'fecha'          => date('d-m-Y',time())
            ]);
            act_corr_x_activo::where('taqActCorrAct','LIKE',$request -> taqActCorrAct) -> delete();
            return redirect()->route('mtto.corr.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('status', 'Actividad finalizada');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('mtto.corr.activo.show', ['taqmttActivo' => $request -> taqmttActivo]) -> with('error', 'Problema finalizando actividad');
        }
    }
}
