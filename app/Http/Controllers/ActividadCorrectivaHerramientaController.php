<?php

namespace App\Http\Controllers;

use App\Models\manttocorrectivoHerramienta;
use App\Models\actividadcorrectivaherramienta;
use App\Models\responsable;

use Illuminate\Http\Request;
use App\Http\Requests\ActividadCorrectivaHerramientaRequest;
use App\Http\Requests\ActivoRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class ActividadCorrectivaHerramientaController extends Controller
{
        /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqmttHerramienta)
    {
        return view('actividades/createCorrectivaHerramienta',[
            'manto' => manttocorrectivoHerramienta::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
            'respon' => responsable::all(),
        ]);
    }

    public function edit($taqActCorrHer)
    {
        return view('actividades/editCorrectivaHerramienta',[
            'respon' => responsable::all(),
            'data' => actividadcorrectivaherramienta::where('taqActCorrHer','LIKE',$taqActCorrHer)->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ActividadCorrectivaHerramientaRequest $request)
    {
        $taqActCorrHer = count(actividadcorrectivaherramienta::where('taqmttHerramienta','LIKE',$request -> taqmttHerramienta)->get())+1;
        actividadcorrectivaherramienta::create([
            'taqActCorrHer'     => uniqid('ACT-CORR-',TRUE),
            'taqmttHerramienta' => $request -> taqmttHerramienta,
            'taqresponsable'    => $request -> taqresponsable,
            'nombre'            => $request -> actividad,
            'estado'            => 'ASIGNADO',
            'fecha'             => date('d-m-Y', time()),
            'fechaFin'          => 'AUN EN PROCESO'
        ]);

        Session::flash('actividadCreada','Se ha registrado la actividad correctamente.');
        return redirect()->route('mantocorrHerramienta.show',$request -> taqmttHerramienta);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        actividadcorrectivaherramienta::where('taqActCorrHer','LIKE',$request -> taqActCorrHer)-> update([
            'taqresponsable'=> $request -> taqresponsable,
            'nombre'        => $request -> actividad,
            'estado'        => $request -> estado,
        ]);

        Session::flash('actividadUpdate','Se ha actualizado la actividad correctamente.');
        return redirect()->route('mantocorrHerramienta.show',$request -> taqmttHerramienta);
    }

    public function delete(Request $request){

        actividadcorrectivaherramienta::where('taqActCorrHer','LIKE',$request->taqActCorrHer)-> delete();

        Session::flash('actividadDelete','Actividad Borrada con exito');
        return redirect()->route('mantocorrHerramienta.show',$request -> taqmttHerramienta);
    }

    public function Asiganaciontarea($taqmttHerramienta,$taqActCorrHer){

        return view('actividades/AsignarResponsableActividadCorrectivaActivo',[
            'manto' => manttocorrectivoHerramienta::with('Activos')->where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
            'respon' => responsable::all(),
            'taqActCorrHer' => $taqActCorrHer,
            'taqmttHerramienta' =>$taqmttHerramienta,
        ]);
    }

    public function updateAsigancion(Request $request)
    {
        actividadcorrectivaherramienta::where('taqActCorrHer','LIKE',$request -> taqActCorrHer)-> update([
            'taqresponsable'=> $request -> taqresponsable,
            'estado'        => 'ASIGNADO',
        ]);

        Session::flash('actividadUpdate','Se ha actualizado la actividad correctamente.');
        return redirect()->route('mantocorrHerramienta.show',$request -> taqmttHerramienta);
    }

    public function finactividad(Request $request)
    {

        $actividad = actividadcorrectivaherramienta::where('taqActCorrHer','LIKE',$request -> taqActCorrHer)->get();

        actividadcorrectivaherramienta::where('taqActCorrHer','LIKE',$request -> taqActCorrHer)-> update([
            'estado' => 'TERMINADO',
            'fechaFin' => date('d-m-Y',time()),
        ]);

        Session::flash('actividadUpdate','Se ha finalizado la actividad correctamente.');
        return redirect()->route('mantocorrHerramienta.show',$actividad[0]['taqmttHerramienta']);
    }


}
