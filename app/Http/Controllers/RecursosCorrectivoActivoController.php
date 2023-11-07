<?php

namespace App\Http\Controllers;

use App\Models\manttocorrectivoactivo;
use App\Models\recursosMantoCorActs;
use App\Models\responsable;

use Illuminate\Http\Request;
use App\Http\Requests\recursosCorrectivoActivoRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class RecursosCorrectivoActivoController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqmttActivo)
    {
        return view('recursosMantenimiento/createCorrectivoActivo',[
            'manto' => manttocorrectivoactivo::with('Activos')->where('taqmttActivo','LIKE',$taqmttActivo)->get(),
            'respon' => responsable::all(),
        ]);
    }

    public function edit($taqrecactcorr)
    {
        $Actividad = recursosMantoCorActs::where('taqrecactcorr','LIKE',$taqrecactcorr)->get();

        return view('recursosMantenimiento/editCorrectivoActivo',[
            'respon' => responsable::all(),
            'data' => $Actividad,
            'taqmanto' => $Actividad[0]['taqmttActivo']
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(recursosCorrectivoActivoRequest $request)
    {
        recursosMantoCorActs::create([
            'taqrecactcorr' => uniqid(),
            'taqmttActivo'  => $request -> taqmttActivo,
            'nombre'        => $request -> nombre,
            'cantidad'      => $request -> cantidad,
            'descripcion'   => $request -> descripcion,
        ]);

        Session::flash('RecursoCreado','Se ha registrado el recurso correctamente.');
        return redirect()->route('mantocorrActivo.show',$request -> taqmttActivo);
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
        recursosMantoCorActs::where('taqrecactcorr','LIKE',$request -> taqrecactcorr)-> update([
            'nombre'        => $request -> nombre,
            'descripcion'   => $request -> descripcion,
            'cantidad'      => $request -> cantidad,
        ]);

        Session::flash('actividadUpdate','Se ha actualizado la actividad correctamente.');
        return redirect()->route('mantocorrActivo.show',$request -> taqmttActivo);
    }

    public function delete(Request $request){

        recursosMantoCorActs::where('taqrecactcorr','LIKE',$request->taqrecactcorr)-> delete();

        Session::flash('RecursoDelete','Recurso Borrado con exito');
        return redirect()->route('mantocorrActivo.show',$request -> taqmttActivo);
    }

}
