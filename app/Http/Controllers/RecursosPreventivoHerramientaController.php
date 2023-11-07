<?php

namespace App\Http\Controllers;

use App\Models\manttopreventivoHerramienta;
use App\Models\recursosmantoprevher;
use App\Models\responsable;

use Illuminate\Http\Request;
use App\Http\Requests\RecursosPreventivoHerramientaRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class RecursosPreventivoHerramientaController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqmttHerramienta)
    {
        return view('recursosMantenimiento/createPreventivoHerramienta',[
            'manto' => manttopreventivoHerramienta::with('herramienta')->where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
            'respon' => responsable::all(),
        ]);
    }

    public function edit($taqrecherprev)
    {
        $Actividad = recursosmantoprevher::where('taqrecherprev','LIKE',$taqrecherprev)->get();
        return view('recursosMantenimiento/editPreventivoHerramienta',[
            'respon' => responsable::all(),
            'data' => $Actividad,
            'taqmanto' => $Actividad[0]['taqmttHerramienta']
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RecursosPreventivoHerramientaRequest $request)
    {
        recursosmantoprevher::create([
            'taqrecherprev' => uniqid(),
            'taqmttHerramienta' => $request->taqmttHerramienta,
            'nombre'        => $request -> nombre,
            'cantidad'      => $request -> cantidad,
            'descripcion'   => $request -> descripcion,
        ]);
        Session::flash('RecursoCreado','Se ha registrado el recurso correctamente.');
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
        recursosmantoprevher::where('taqrecherprev','LIKE',$request -> taqrecherprev)-> update([
            'nombre'        => $request -> nombre,
            'descripcion'   => $request -> descripcion,
            'cantidad'      => $request -> cantidad,
        ]);

        Session::flash('RecursoUpdate','Se ha actualizado el recurso correctamente.');
        return redirect()->route('mantoPrevHerramienta.show',$request -> taqmttHerramienta);
    }

    public function delete(Request $request){

        recursosmantoprevher::where('taqrecherprev','LIKE',$request->taqrecherprev)-> delete();

        Session::flash('RecursoDelete','Recurso Borrado con exito');
        return redirect()->route('mantoPrevHerramienta.show',$request -> taqmttHerramienta);
    }

}
