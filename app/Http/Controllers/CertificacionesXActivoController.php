<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\cert_x_activo_eli;
use App\Models\cert_x_activo;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;


class CertificacionesXActivoController extends Controller
{
    public function store(Request $request)
    {
        try {
            $certificacion = strtotime($request->fechacertificacion);
            if($request -> frecuencia=='3'){
                $frecuencia = date('d-m-Y',strtotime($request->fechacertificacion."+ 3 months"));
            }else if($request -> frecuencia=='6'){
                $frecuencia = date('d-m-Y',strtotime($request->fechacertificacion."+ 6 months"));
            }else if($request -> frecuencia=='1'){
                $frecuencia = date('d-m-Y',strtotime($request->fechacertificacion."+ 12 months"));
            }else if($request -> frecuencia=='5'){
                $frecuencia = date('d-m-Y',strtotime($request->fechacertificacion."+ 60 months"));
            }else if($request -> frecuencia=='10'){
                $frecuencia = date('d-m-Y',strtotime($request->fechacertificacion."+ 120 months"));
            }
            for ($i = 1; $i <= $request -> CantImages; $i++) {
                $documento = $request -> file('Image_'.$i);
                $nombre = $documento -> getClientOriginalName();
                $documento->move("/home/gematech/public_html/storage/Activos/".$request->taqActivos."/Certificaciones",$nombre); 
                cert_x_activo::create([
                    'taqActivos'       => $request->taqActivos,
                    'taqDoc'           => uniqid(TRUE),
                    'nombre'           => $nombre,
                    'fechacertificion' => date("d-m-Y",$certificacion),
                    'frecuencia'       => $frecuencia,
                    'estado'           => 'VIGENTE',
                    'DocURL'           => $request -> taqActivos . "/Certificaciones/" . $nombre,
                ]);
            }
            return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Certificacion Registrada Correctamente');
        } catch (\Throwable $th) {
            
            return redirect() -> route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'Problema Registrando Certificacion');
        }
    }

    public function delete(Request $request)
    {
        try {
            $documento = cert_x_activo::where('taqDoc','LIKE', $request -> taqDoc) -> get();
            $filePath = "/home/gematech/public_html/storage/Activos/{$documento[0]['taqActivos']}/Certificaciones/{$documento[0]['nombre']}";
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            cert_x_activo_eli::create([
                'taqDeleteRegister' => uniqid(TRUE),
                'taqActivos'        => $documento[0]['taqActivos'],
                'taqresponsable'    => Auth::user() -> taqresponsable,
                'nombreDocumento'   => $documento[0]['nombre'],
            ]);
            cert_x_activo::where('taqDoc','LIKE', $request -> taqDoc)->delete();
            return redirect()->route('activos.show', ['activos' => $documento[0]['taqActivos']]) ->with('status', 'Certificacion eliminado correctamente');
        } catch (\Throwable $th) {
            
            return redirect()->route('activos.show', ['activos' => $documento[0]['taqActivos']]) ->with('error', 'Problema eliminando el Certifido');
        }
    }

    // public function caducado($taqDoc,$taqActivos){

    //     $certificacion = certificacione::where('taqDoc','LIKE', $taqDoc)->get();

    //     certificacione::where('taqDoc','LIKE', $taqDoc) -> update([
    //         'estado' => 'CADUCADO',
    //     ]);

    //     Session::flash('UpdateEstado','Certificacion'.$taqDoc.' Caducada');
    //     return redirect()->route('activos.show',$taqActivos);

    // }


    // public function show($taqActivos,$taqDoc){
    //     return view('activo/document',[
    //         'profile' => activos::where('taqActivos','LIKE', $taqActivos)->get(),
    //         'file'    => certificacione::where('taqDoc', 'LIKE', $taqDoc)->get(),
    //     ]);
    // }

    
}
