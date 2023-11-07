<?php

namespace App\Http\Controllers;

use App\Models\manttohorasactivo;
use App\Models\herramienta;
use App\Models\actprevhercum;
use App\Models\activos;
use App\Models\actividadhoraactivo;
use App\Models\actividadhoracumplido;
use App\Models\responsable;
use Illuminate\Http\Request;
use App\Http\Requests\ActividadHoraRequest;
use App\Http\Requests\HerramientaRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class ActividadHoraActivoController extends Controller
{
        /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqActivos)
    {
        return view('actividades/createActividadHora',[
            'taqActivos' => $taqActivos
        ]);
    }

    public function edit($taqActPrevHer)
    {
        $Actividad = actividadhoraactivo::where('taqActPrevHer','LIKE',$taqActPrevHer)->get();
        $manto = manttohorasactivo::with('herramienta')->where('taqmttHerramienta','LIKE',$Actividad[0]['taqmttHerramienta'])->get();

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
    public function store(ActividadHoraRequest $request)
    {
        $actividadCount = count(actividadhoraactivo::where('taqActivos','LIKE',$request -> taqActivos)->get())+1;

        activos::where('taqActivos','LIKE',$request -> taqActivos)-> update([
            'horasuso'      => $request -> horometroactual,
        ]);

        $Activo = activos::where('taqActivos','LIKE',$request -> taqActivos)->get();

        actividadhoraactivo::create([
            'taqActividadHora'      => 'AH-'.$request -> taqActivos .'-'.$actividadCount,
            'taqActivos'            => $request -> taqActivos,
            'nombreActividad'       => $request -> actividad,
            'estado'                => 'SIN ASINGAR',
            'Frecuencia'            => $request -> frecuencia,
            'ultimoHorometroMTTO'   => $request -> ultimohorometro,
            'proximoHormetroMTTO'   => $request -> frecuencia + $request -> ultimohorometro,
            'kmFaltantes'           => ($request -> frecuencia + $request -> ultimohorometro) - $Activo[0]['horasuso'],
        ]);

        Session::flash('actividadCreada','Se ha registrado la actividad correctamente.');
        return redirect()->route('activos.show',$request -> taqActivos);
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

        $Activo = activos::where('taqActivos','LIKE',$request -> taqActivos)->get();

        activos::where('taqActivos','LIKE',$request -> taqActivos)-> update([
            'horasuso' => $request -> horasupdate ,
        ]);

        $countActividad = count(actividadhoraactivo::where('taqmttActivo','LIKE',$request->taqmttActivo)->get());
        $Actividad = actividadhoraactivo::where('taqmttActivo','LIKE',$request->taqmttActivo)->get();

        for ($i = 0; $i < $countActividad; $i++) {
            actividadhoraactivo::where('taqActividadHora','LIKE',$Actividad[$i]['taqActividadHora'])-> update([
                'kmFaltantes' =>  ($Actividad[$i]['frecuencia'] + $Actividad[$i]['ultimoHorometroMTTO'] ) - $request -> horasupdate,
            ]);
        }

        Session::flash('actividadUpdate','Se ha actualizado las actividades correctamente.');
        return redirect()->route('mantoHorasActivo.show',$request -> taqmttActivo);
    }

    public function List($taqmttHerramienta)
    {
        $manto = manttohorasactivo::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get();
        return view('mttoHerramienta/listPrev',[
            'mantos' => manttohorasactivo::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
            'countactividades' => count(actividadhoraactivo::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get()),
            'prevs' => actividadhoraactivo::with('responsables')->where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
        ]);
    }

    public function asignacion($taqActividadHora,$taqmttActivo)
    {
        return view('actividades/AsignarResponsableActividadHoraActivo',[
            'respon' => responsable::all(),
            'taqActividadHora' => $taqActividadHora,
            'taqmttActivo' =>$taqmttActivo,
        ]);
    }

    public function updateAsignacion(Request $request)
    {
        actividadhoraactivo::where('taqActividadHora','LIKE',$request -> taqActividadHora)-> update([
            'taqresponsable'=> $request -> taqresponsable,
            'estado'        => 'ASIGNADO',
        ]);

        Session::flash('actividadAsignada','Se ha asignado la actividad correctamente.');
        return redirect()->route('mantoHorasActivo.show',$request -> taqmttActivo);
    }

    public function delete(Request $request){
        $data = actividadhoraactivo::where('taqActividadHora','LIKE',$request->taqActividadHora)->get();
        actividadhoraactivo::where('taqActividadHora','LIKE',$request->taqActividadHora)-> delete();

        Session::flash('actividadDelete','Actividad Borrada con exito');
        return redirect()->route('actividadhoraactivo.list',$data[0]['taqmttActivo']);
    }

    public function terminarActividad(Request $request){

        $ACTIVIDAD = actividadhoraactivo::with('mantenimiento')->where('taqActividadHora','LIKE',$request -> taqActividadHora)->get();
        $Activo = activos::where('taqActivos','LIKE',$ACTIVIDAD[0]['mantenimiento']['taqActivos'])->get();
        $countact = count(actividadhoracumplido::where('taqmttActivo','LIKE',$ACTIVIDAD[0]['taqmttActivo'])->get());

        actividadhoracumplido::create([
            'taqActividadHora' => uniqid($ACTIVIDAD[0]['taqActividadHora'].'-CUM-'.$ACTIVIDAD[0]['taqmttActivo'],TRUE),
            'taqmttActivo'     => $ACTIVIDAD[0]['taqmttActivo'],
            'taqresponsable'   => $ACTIVIDAD[0]['taqresponsable'],
            'nombre'           => $ACTIVIDAD[0]['nombre'],
            'estado'           => 'FINALIZADO',
            'frecuencia'       => $ACTIVIDAD[0]['frecuencia'],
            'ultimoHorometroMTTO' => $ACTIVIDAD[0]['ultimoHorometroMTTO'],
        ]);

        actividadhoraactivo::where('taqActividadHora','LIKE',$request -> taqActividadHora)-> update([
            'taqresponsable'        =>  uniqid($ACTIVIDAD[0]['mantenimiento']['taqresponsable'],TRUE),
            'estado'                =>  'SIN ASIGNAR',
            'ultimoHorometroMTTO'   =>  $Activo[0]['horasuso'],
            'proximoHormetroMTTO'   =>  $ACTIVIDAD[0]['frecuencia'] + $Activo[0]['horasuso'],
            'kmFaltantes'           =>  ( $ACTIVIDAD[0]['frecuencia'] + $Activo[0]['horasuso'] ) - $Activo[0]['horasuso'],
        ]);

        Session::flash('actividadFinalizada','Actividad Finalizada con exito');
        return redirect()->route('mantoHorasActivo.show',$ACTIVIDAD[0]['taqmttActivo']);
    }

}
