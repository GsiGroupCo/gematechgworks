<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\herramienta;
use App\Models\ots_document;
use App\Models\documentosOtDelete;
use App\Models\ot;
Use Session;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use App\Models\docs_x_ot;
use App\Models\docs_x_ot_eli;

class docsOtController extends Controller
{

    public function store(Request $request)
    {
        try {
            for ($i = 1; $i <= $request -> CantImages; $i++) {
                $documento = $request -> file('Image_'.$i);
                $nombre = $documento -> getClientOriginalName(); 
                $ruta = "/home/gematech/public_html/storage/Oms/".$request->taqot."/Documentos";
                $documento->move($ruta, $nombre);
                docs_x_ot::create([
                    'taqDoc'   => uniqid(TRUE),
                    'taqot'    => $request ->taqom,
                    'nombre'   => $nombre,
                    'DocURL'   => $request ->taqom . "/Documentos/" . $nombre,
                ]);
            }
            return redirect() -> route('ots.show', ['ots' => $request->taqot]) -> with('status', 'Documentos Registrado Correctamente');
        } catch (\Throwable $th) {
            
            return redirect() -> route('ots.show', ['ots' => $request->taqot]) -> with('error', 'Problema Registrando Documento');
        }
    }

    public function delete(Request $request)
    {
        try {
            $documento = docs_x_ot::where('taqDoc','LIKE', $request -> taqDoc)->get();
            $filePath = "/home/gematech/public_html/storage/Oms/{$documento[0]['taqot']}/Documentos/{$documento[0]['nombre']}";
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            docs_x_ot_eli::create([
                'taqDeleteRegister' => uniqid(TRUE),
                'taqot'             => $documento[0]['taqot'],
                'taqresponsable'    => Auth::user() -> taqresponsable,
                'nombreDocumento'    => $documento[0]['nombre']
            ]);
            docs_x_ot::where('taqDoc','LIKE', $request -> taqDoc)->delete();
            return redirect() -> route('ots.show', ['ots' => $documento[0]['taqot']]) -> with('status', 'Documentos Eliminado Correctamente');
        } catch (\Throwable $th) {
            
            return redirect() -> route('ots.show', ['ots' => $documento[0]['taqot']]) -> with('error', 'Problema Eliminando Documento');
        }
    }

}

