<?php

namespace App\Http\Controllers;

use App\Models\manttopreventivoactivo;
use App\Models\recursosMantoPrevActs;
use App\Models\responsable;

use Illuminate\Http\Request;
use App\Http\Requests\recursosCorrectivoActivoRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class RecursosPreventivoActivoController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqmttActivo)
    {
        return view('recursosMantenimiento/createPreventivoActivo',[
            'manto' => manttopreventivoactivo::with('Activos')->where('taqmttActivo','LIKE',$taqmttActivo)->get(),
            'respon' => responsable::all(),
        ]);
    }

    public function edit($taqrecactprev)
    {
        $Actividad = recursosMantoPrevActs::where('taqrecactprev','LIKE',$taqrecactprev)->get();

        return view('recursosMantenimiento/editPreventivoActivo',[
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
    
        recursosMantoPrevActs::create([
            'taqrecactprev' => uniqid(),
            'taqmttActivo'  => $request -> taqmttActivo,
            'nombre'        => $request -> nombre,
            'cantidad'      => $request -> cantidad,
            'descripcion'   => $request -> descripcion,
        ]);

        Session::flash('RecursoCreado','Se ha registrado el recurso correctamente.');
        return redirect()->route('mantoPrevActivo.show',$request -> taqmttActivo);
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
        recursosMantoPrevActs::where('taqrecactprev','LIKE',$request -> taqrecactprev)-> update([
            'nombre'        => $request -> nombre,
            'descripcion'   => $request -> descripcion,
            'cantidad'      => $request -> cantidad,
        ]);

        Session::flash('RecursoUpdate','Se ha actualizado el recurso correctamente.');
        return redirect()->route('mantoPrevActivo.show',$request -> taqmttActivo);
    }

    public function delete(Request $request){

        recursosMantoPrevActs::where('taqrecactprev','LIKE',$request->taqrecactprev)-> delete();

        Session::flash('RecursoDelete','Recurso Borrado con exito');
        return redirect()->route('mantoPrevActivo.show',$request -> taqmttActivo);
    }

}
