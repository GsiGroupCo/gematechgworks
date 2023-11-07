<?php

namespace App\Http\Controllers;

use App\Models\empresas;
use App\Models\User;
use App\Models\activos;
use App\Models\movactivo;
use App\Models\ot;
Use Session;
Use Redirect;
use App\Http\Requests\movactivoRequest;

class movactivosController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($taqactivos,$categoria)
    {
        if($categoria == 'EQUIPOS INTERNOS'){
            return view('ot/createOIT',[
                'taqEmpresa' =>  empresas::where('taqempresa','LIKE','GSI')->get(),
                'taqBop' => activos::where('taqActivos','LIKE',$taqactivos)->get(),
                'respon' => User::where('taqempresa','LIKE','GSI')->get(),
                'creacion' => 'movei',
            ]);
        }
        else if($categoria == 'PRESTACION DE SERVICIOS'){
            return view('ot/createOT',[
                'taqEmpresa' =>  empresas::where('taqempresa','NOT LIKE','GSI')->get(),
                'taqBop' => activos::where('taqActivos','LIKE',$taqactivos)->get(),
                'respon' => User::where('taqempresa','LIKE','GSI')->get(),
                'creacion' => 'movps',
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(movactivoRequest $request)
    {
        $var = count(movactivo::where('taqActivos','LIKE',$request->taqActivos)->get())+1;

        movactivo::create([
            'taqmovactivos'     => "MOV-ACT-".$request->taqActivos.$request->taqot.$var,
            'taqActivos'        => $request -> taqActivos,
            'taqot'          => $request ->taqom,
            'taqempresa'     => $request -> taqempresa,
            'ubicacionactual'=> $request -> areaactual,
            'ubicacionnueva' => $request -> areasolicitante,
            'fecha'          => $request -> fecha,
            'descripcion'    => $request -> descripcion,
        ]);

        Session::flash('movactivoNEW','Se ha registrado el movimiento correctamente.');

        return redirect()->route('activos.show',$request -> taqActivos);

    }

}
