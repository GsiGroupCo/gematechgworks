<?php

namespace App\Http\Controllers;

use App\Models\manttocorrectivoHerramienta;
use App\Models\recursosmantocorher;
use App\Models\responsable;

use Illuminate\Http\Request;
use App\Http\Requests\recursosCorrectivoHerramientaRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
Use Session;

class RecursosCorrectivoHerramientaController extends Controller
{
   /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqmttHerramienta)
    {
        return view('recursosMantenimiento/createCorrectivoHerramienta',[
            'manto' => manttocorrectivoHerramienta::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
            'respon' => responsable::all(),
        ]);
    }

    public function edit($taqrecactcorr)
    {
        $Actividad = recursosmantocorher::where('taqrecactcorr','LIKE',$taqrecactcorr)->get();

        return view('recursosMantenimiento/editCorrectivoHerramienta',[
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
    public function store(recursosCorrectivoHerramientaRequest $request)
    {
        recursosmantocorher::create([
            'taqrecactcorr'      => uniqid(),
            'taqmttHerramienta'  => $request -> taqmttHerramienta,
            'nombre'             => $request -> nombre,
            'cantidad'           => $request -> cantidad,
            'descripcion'        => $request -> descripcion,
        ]);

        Session::flash('RecursoCreado','Se ha registrado el recurso correctamente.');
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
        recursosmantocorher::where('taqrecactcorr','LIKE',$request -> taqrecactcorr)-> update([
            'nombre'        => $request -> nombre,
            'cantidad'      => $request -> cantidad,
        ]);

        Session::flash('actividadUpdate','Se ha actualizado la actividad correctamente.');
        return redirect()->route('mantocorrHerramienta.show',$request -> taqmttHerramienta);
    }

    public function delete(Request $request){

        recursosmantocorher::where('taqrecactcorr','LIKE',$request->taqrecactcorr)-> delete();

        Session::flash('RecursoDelete','Recurso Borrado con exito');
        return redirect()->route('mantocorrHerramienta.show',$request -> taqmttHerramienta);
    }
}
