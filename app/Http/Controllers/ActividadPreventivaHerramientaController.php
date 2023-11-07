<?php

namespace App\Http\Controllers;

use App\Models\manttopreventivoHerramienta;
use App\Models\herramienta;
use App\Models\actprevhercum;
use App\Models\actividadpreventivaherramienta;
use App\Models\responsable;

use Illuminate\Http\Request;
use App\Http\Requests\ActividadPreventivoHerramientaRequest;
use App\Http\Requests\HerramientaRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class ActividadPreventivaHerramientaController extends Controller
{
        /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqmttHerramienta)
    {
        return view('actividades/createPreventivaHerramienta',[
            'manto' => manttopreventivoHerramienta::with('herramienta')->where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
            'respon' => responsable::all(),
        ]);
    }

    public function edit($taqActPrevHer)
    {
        $Actividad = actividadpreventivaherramienta::where('taqActPrevHer','LIKE',$taqActPrevHer)->get();
        $manto = manttopreventivoHerramienta::with('herramienta')->where('taqmttHerramienta','LIKE',$Actividad[0]['taqmttHerramienta'])->get();

        return view('actividades/editPreventivoHerramienta',[
            'respon' => responsable::all(),
            'data' => $Actividad,
            'taqmttHerramienta' => $Actividad[0]['taqmttHerramienta']
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ActividadPreventivoHerramientaRequest $request)
    {
        $Herramienta = manttopreventivoHerramienta::where('taqmttHerramienta','LIKE',$request->taqmttHerramienta)->get();

        $ultimomtto   = date('d-m-Y',strtotime($request->fecha));
        $fechaproximo = date('d-m-Y',strtotime($ultimomtto."+".$request->frecuencia." days"));
        actividadpreventivaherramienta::create([
            'taqActPrevHer'     => uniqid('AT-PV-'.$Herramienta[0]['taqherramienta'],TRUE),
            'taqmttHerramienta' => $request -> taqmttHerramienta,
            'taqresponsable'    => $request -> taqresponsable,
            'nombre'            => $request -> actividad,
            'estado'            => 'SIN ASIGNAR',
            'frecuencia'        => $request -> frecuencia,
            'fecha'             => date('d-m-Y',strtotime($ultimomtto)),
            'fechaFin'          => $fechaproximo,
        ]);

        Session::flash('actividadCreada','Se ha registrado la actividad correctamente.');
        return redirect()->route('mantoPrevHerramienta.show',$request -> taqmttHerramienta);
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
        $data = actividadpreventivaherramienta::where('taqActPrevHer','LIKE', $request -> taqActPrevHer) -> get();
        $ultimomtto = strtotime($request->fecha);
        $fechaproximo = strtotime(date('d-m-Y',$ultimomtto)."+".$request -> frecuencia." days");
        actividadpreventivaherramienta::where('taqActPrevHer','LIKE',$request -> taqActPrevHer)-> update([
            'taqresponsable'=> $request -> taqresponsable,
            'nombre'        => $request -> actividad,
            'frecuencia'    => $request -> frecuencia,
            'fecha'         => date('d-m-Y',$ultimomtto),
            'fechaFin'      => date("d-m-Y",$fechaproximo),
        ]);

        Session::flash('actividadUpdate','Se ha actualizado la actividad correctamente.');
        return redirect()->route('ActividadPreventivaHerramienta.list',$request -> taqmttHerramienta);
    }

    public function List($taqmttHerramienta)
    {
        $manto = manttopreventivoHerramienta::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get();
        return view('mttoHerramienta/listPrev',[
            'mantos' => manttopreventivoHerramienta::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
            'countactividades' => count(actividadpreventivaherramienta::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get()),
            'prevs' => actividadpreventivaherramienta::with('responsables')->where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
        ]);
    }

    public function asignacion($taqActPrevHer,$taqmttHerramienta)
    {
        return view('actividades/AsignarResponsableactividadpreventivaherramienta',[
            'respon' => responsable::all(),
            'taqActPrevHer' => $taqActPrevHer,
            'taqmttHerramienta' =>$taqmttHerramienta,
        ]);
    }

    public function updateAsignacion(Request $request)
    {
        actividadpreventivaherramienta::where('taqActPrevHer','LIKE',$request -> taqActPrevHer)-> update([
            'taqresponsable'=> $request -> taqresponsable,
            'estado'        => 'ASIGNADO',
        ]);

        Session::flash('actividadAsignada','Se ha asignado la actividad correctamente.');
        return redirect()->route('mantoPrevHerramienta.show',$request -> taqmttHerramienta);
    }

    public function delete(Request $request){

        actividadpreventivaherramienta::where('taqActPrevHer','LIKE',$request->taqActPrevHer)-> delete();

        Session::flash('actividadDelete','Actividad Borrada con exito');
        return redirect()->route('mantocorrHerramienta.show',$request -> taqmttHerramienta);
    }

    public function terminarActividad(Request $request){

        $ACTIVIDAD = actividadpreventivaherramienta::with('preventivos')->where('taqActPrevHer','LIKE',$request -> taqActPrevHer)->get();
        $taqActPrevHercum = count(actprevhercum::where('taqActPrevHer','LIKE',$request -> taqActPrevHer)->get());
        actprevhercum::create([
            'taqActPrevHercum' => uniqueid($ACTIVIDAD[0]['taqActPrevHer'].'-CUM-',TRUE),
            'taqActPrevHer'    => $ACTIVIDAD[0]['taqActPrevHer'],
            'taqmttHerramienta'=> $ACTIVIDAD[0]['taqmttHerramienta'],
            'taqresponsable'   => $ACTIVIDAD[0]['taqresponsable'],
            'nombre'           => $ACTIVIDAD[0]['nombre'],
            'estado'           => 'FINALIZADO',
            'frecuencia'       => $ACTIVIDAD[0]['frecuencia'],
            'fecha'            => $ACTIVIDAD[0]['fechaFin'],
        ]);

        $ultimomtto = date('d-m-Y',time());
        $fechaproximo = strtotime($ultimomtto."+".$ACTIVIDAD[0]['frecuencia']." days");

        actividadpreventivaherramienta::where('taqActPrevHer','LIKE',$request -> taqActPrevHer)-> update([
            'taqresponsable' => $ACTIVIDAD[0]['preventivos']['taqresponsable'],
            'estado'         => 'SIN ASIGNAR',
            'fecha'          => $ultimomtto,
            'fechaFin'       => date("d-m-Y",$fechaproximo),
        ]);

        Session::flash('actividadFinalizada','Actividad Finalizada con exito');
        return redirect()->route('mantoPrevHerramienta.show',$ACTIVIDAD[0]['taqmttHerramienta']);
    }
}
