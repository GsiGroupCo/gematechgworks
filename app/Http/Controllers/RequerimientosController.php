<?php


namespace App\Http\Controllers;

use App\Models\requerimientos;
use App\Models\autorizador;
use App\Models\responsable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\RequerimientoRequest;
use Illuminate\Support\Facades\Redirect;
Use Session;

class RequerimientosController extends Controller
{
    public function store(RequerimientoRequest $request){
        
        $duplicado  = count(requerimientos::where('id_requesicion','LIKE',$request -> id_requesicion)->get());

        if($duplicado!=1){
            $cargo_solicitante = responsable::with('cargo')->where('taqresponsable','LIKE',$request->taqresponsable)->get();
            $cargoAutorizador = autorizador::where('id_autorizador','LIKE',$request->id_autorizador)->get();
            
            $cargo = requerimientos::create([
                'id_requesicion' => $request -> id_requesicion,
                'proyecto'       => $request -> proyecto,
                'taqot'          => $request ->taqom,
                'taqresponsable' => $request -> taqresponsable,
                'cargo_solicitante' => $cargo_solicitante[0]['cargo']['cargo'],
                'Autoriza'       => $request -> id_autorizador,
                'cargo_Autoriza' => $cargoAutorizador[0]['cargo'],
                'estado'         => 'revicion',
            ]);
            Session::flash('RequerimientoCreado','Se ha registrado el requerimiento correctamente.');
            return redirect()->route('ots.show',$request ->taqom);
        }else{
            return Redirect::back()->withErrors(['msg' => 'El Requerimiento ya se encuentra registrado']);
        }
    }

    public function update(Request $request){
        $cargo_solicitante = responsable::with('cargo')->where('taqresponsable','LIKE',$request->taqresponsable)->get();
        $cargoAutorizador = autorizador::where('id_autorizador','LIKE',$request->id_autorizador)->get();

        $cargo = requerimientos::where('id_requesicion', 'LIKE', $request -> id_requesicion) -> update([
            'proyecto'       => $request -> proyecto,
            'taqresponsable' => $request -> taqresponsable,
            'cargo_solicitante' => $cargo_solicitante[0]['cargo']['cargo'],
            'Autoriza'       => $request -> id_autorizador,
            'cargo_Autoriza' => $cargoAutorizador[0]['cargo'],
        ]);

        Session::flash('RequerimientoActualizado','Se ha editado el requerimiento correctamente.');
        return redirect()->route('ots.show',$request ->taqom);
    }

    public function show($id_requesicion){
        $requerimiento = requerimientos::where('id_requesicion', 'LIKE', $id_requesicion) -> get();
        return view('requerimientos.info',[
            'requerimiento' => $requerimiento,
        ]);
    }
    
}
