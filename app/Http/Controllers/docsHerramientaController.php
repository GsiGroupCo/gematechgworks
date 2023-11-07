<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\herramienta;
use App\Models\docsmttoherramienta;
use App\Models\Herramientas_document;
use App\Models\documentosHerramientasDeletes;
Use Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
use App\Http\Requests\DocumentsHerramientaRequest;
use App\Http\Requests\DocumentosDeleteHerramientasRequest;
use App\Models\docs_x_herramientas;
use App\Models\docs_x_herramientas_eli;
use Illuminate\Support\Facades\Auth;

class docsHerramientaController extends Controller
{

    public function store(Request $request)
    {
        try {
            for ($i = 1; $i <= $request -> CantImages; $i++) {
                $documento = $request -> file('Image_'.$i);
                $nombre = $documento -> getClientOriginalName(); 
                $ruta = "/home/gematech/public_html/storage/Herramientas/".$request->taqHer."/Documentos";  
                $documento->move($ruta,$nombre); 
                docs_x_herramientas::create([
                    'taqHer'      => $request -> taqHer,
                    'taqDoc'      => uniqid(TRUE),
                    'nombre'      => $nombre,
                    'DocURL'      => $request -> taqHer . "/Documentos/" . $nombre,
                ]);
            }
            return redirect() -> route('herramientas.show', ['taqHer' => $request->taqHer]) -> with('status', 'Documentos Registrado Correctamente');
        } catch (\Throwable $th) {
            dd($th);
            return redirect() -> route('herramientas.show', ['taqHer' => $request->taqHer]) -> with('error', 'Problema Registrando Documento');
        }
    }

    public function delete(Request $request){
        try {
            $documento = docs_x_herramientas::where('taqDoc','LIKE', $request -> taqDoc)->get(); 
            $filePath = "/home/gematech/public_html/storage/Herramientas/".$request->taqHer."/Documentos/{$documento[0]['nombre']}";   
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            docs_x_herramientas_eli::create([
                'taqDeleteRegister' => uniqid(TRUE),
                'taqHer'            => $documento[0]['taqHer'],
                'taqresponsable'    => Auth::user() -> taqresponsable,
                'nombreDocumento'   => $documento[0]['nombre'],
            ]);
            docs_x_herramientas::where('taqDoc','LIKE', $request -> taqDoc)->delete();
            return redirect()->route('herramientas.show', ['taqHer' => $documento[0]['taqHer']]) ->with('status', 'Documento eliminado correctamente');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('herramientas.show', ['taqHer' => $documento[0]['taqHer']]) ->with('error', 'Problema eliminando el documento');
        }
    }
 
}

