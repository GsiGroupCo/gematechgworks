<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\docs_x_responsables;
use App\Models\docs_x_responsables_eli;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;

class docsResponsableController extends Controller
{
    public function store(Request $request)
    {
        try {
            for ($i = 1; $i <= $request -> CantImages; $i++) {
                $documento = $request -> file('Image_'.$i);
                $nombre = $documento -> getClientOriginalName();
                $documento->move(public_path()."/storage/"."Responsables/".$request->taqresponsable."/Documentos",$nombre); 
                docs_x_responsables::create([
                    'documento_id'   => uniqid(TRUE),
                    'taqresponsable' => $request -> taqresponsable,
                    'nombre'         => $nombre,
                    'url'            => $request -> taqresponsable . "/Documentos/" . $nombre,
                ]);
            }
            return redirect() -> route('responsables.show', ['responsables' => $request->taqresponsable]) -> with('status', 'Documentos Registrado Correctamente');
        } catch (\Throwable $th) {
            
            return redirect() -> route('responsables.show', ['responsables' => $request->taqresponsable]) -> with('error', 'Problema Registrando Documento');
        }
    }

    public function delete(Request $request)
    {
        try {
            $documento = docs_x_responsables::where('documento_id','LIKE', $request -> documento_id)->get();
            $filePath = public_path("/storage/Responsables/{$documento[0]['taqresponsable']}/Documentos/{$documento[0]['nombre']}");
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            docs_x_responsables_eli::create([
                'documento_eliminado_id' => uniqid(TRUE),
                'documento_id'           => $documento[0]['documento_id'],
                'taqresponsable'         => Auth::user() -> taqresponsable,
                'nombre'                 => $documento[0]['nombre']
            ]);
            docs_x_responsables::where('taqDoc','LIKE', $request -> taqDoc)->delete();
            return redirect() -> route('responsables.show', ['responsables' => $documento[0]['taqresponsable']]) -> with('status', 'Documentos Registrado Correctamente');
        } catch (\Throwable $th) {
            
            return redirect() -> route('responsables.show', ['responsables' => $documento[0]['taqresponsable']]) -> with('error', 'Problema Registrando Documento');
        }
    }
}
