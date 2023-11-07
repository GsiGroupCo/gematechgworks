<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\herramienta;
use App\Models\responsable;
use App\Models\mtto_corr_x_herramientas;
use App\Models\act_x_mantenimiento;
use App\Models\mtto_corr_x_herramientas_cump;
use App\Models\manttoCorrHerramientaRequest;
use App\Models\mantenimientos;


class mtto_corr_x_herramientasController extends Controller
{

    public function show($taqmttHerramienta)
    {
        return view('mttoHerramienta/infoCorr',[
            'profile' => mtto_corr_x_herramientas::with('Responsable','actividades.responsables')->where('taqmttHerramienta','LIKE',$taqmttHerramienta)->get(),
        ]);
    }

    public function create($taqHer)
    {
        return view('mttoHerramienta/createcorrectivo',[
            'mtto'        => mantenimientos::all(),
            'herramienta' => herramienta::where('taqHer','LIKE',$taqHer)->get(),
            'responsable' => responsable::all(),
        ]);
    }

    public function store(manttoCorrHerramientaRequest $request){

        mtto_corr_x_herramientas::create([
            'taqmttHerramienta'   => uniqid('CV-'.date('y')),
            'actividad'      => $request -> actividad,
            'preoperacional' => $request -> preoperacional,
            'area'           => $request -> area,
            'taqHer'         => $request -> taqHer,
            'taqresponsable' => $request -> taqresponsable,
            'estado'         => 'ASIGNADO',
            'fecha'          => date("d-m-Y",time()),
            'fechaFin'       => '',
        ]);

        Session::flash('mttoPrevAdd','Se ha asignado el mantenimiento correctamente.');
        return redirect()->route('herramientas.show',$request -> taqHer);

    }

    public function Terminate(Request $request){
        $data = mtto_corr_x_herramientas::where('taqmttHerramienta','LIKE',$request-> taqMantoherramienta)->get();
        return view('mttoHerramienta/finish',[
            'taqMantoherramienta' => $request -> taqMantoherramienta,
            'responsable'    => responsable::all(),
            'taqHer'     => $data[0]['taqHer'],
            'MantoType'      => 'CORRECTIVO'
        ]);
    }

    public function TerminateMTTO($taqmttHerramienta){
        mtto_corr_x_herramientas::where('taqmttHerramienta','LIKE',$taqmttHerramienta)->update([
            'estado' =>  'FINALIZADO',
            'fechaFin' => date("d-m-Y",time()),
        ]);
        Session::flash('MTTOFIN','Mantenimiento terminado');
        return redirect()->route('mantocorrherramienta.show',$taqmttHerramienta);
    }

    public function reset(Request $request)
    {
        $mttoherramienta = mtto_corr_x_herramientas::where('taqmttHerramienta','LIKE',$request -> taqMantoherramienta)->get();
        $rutinas         = act_x_mantenimiento::where('taqsubrutina','LIKE',$mttoherramienta[0]['taqsubrutina'])->get();
        $herramienta       = herramienta::where('taqHer','LIKE',$request -> taqHer)->get();
        $frecuencia = strtotime(date('d-m-Y', time())." + ". $rutinas[0]['frecuencia'] ." days");
        mtto_corr_x_herramientas_cump::create([
            'taqmttHerramientaCumplidos' => uniqid('MTTOS-ACT-CUMP',TRUE),
            'taqmttHerramienta'          => $request -> taqMantoherramienta,
            'taqresponsable'        => $request -> taqresponsable,
            'taqHer'            => $request -> taqHer,
            'fecha'                 => date('d-m-Y', time()),
        ]);

        mtto_corr_x_herramientas::where('taqsubrutina','LIKE',$mttoherramienta[0]['taqsubrutina']) -> update([
            'fecha'     => date("d-m-Y",$frecuencia),
            'estado'    => 'FINALIZADO',
            'fechaFin'  => date("d-m-Y",time()),
        ]);

        Session::flash('rutinafin','Mantenimiento'.$rutinas[0]['nombre'] .'Terminado');
        return redirect()->route('herramienta.show',$mttoherramienta[0]['taqHer']);
    }
}
