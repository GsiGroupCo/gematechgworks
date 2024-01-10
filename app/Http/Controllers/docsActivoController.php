<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\docs_x_activo;
use App\Models\docs_x_activo_eli;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;

class docsActivoController extends Controller
{
    public function store(Request $request)
    {
        try { 
            for ($i = 1; $i <= $request -> CantImages; $i++) {
                $filename = $request->file('Image')->getClientOriginalName();
                $documento = $request -> file('Image_'.$i);
                $nombre = $documento -> getClientOriginalName();
                $ruta = "/home/gematech/public_html/storage/Activos/".$request->Taq."/Documentos";
                $documento->move($ruta, $nombre);

                $rutaDestino = "Activo/{$taqActivo}";
                $rutaArchivo = "Activo/{$taqActivo}/{$filename}";
                if (!Storage::disk('public')->exists($rutaDestino)) {
                    Storage::disk('public')->makeDirectory($rutaDestino, 0777, true, true);
                }
                Storage::disk('public')->put($rutaArchivo, $compressedImage->stream());

                docs_x_activo::create([
                    'taqActivos'  => $request -> Taq,
                    'taqDoc'      => uniqid(TRUE),
                    'nombre'      => $nombre,
                    'DocURL'      => $request -> Taq . "/Documentos/" . $nombre,
                ]);
            }
            return redirect() -> route('activos.show', ['activos' => $request->Taq]) -> with('status', 'Documentos Registrado Correctamente');
        } catch (\Throwable $th) { 
            return redirect() -> route('activos.show', ['activos' => $request->Taq]) -> with('error', 'Problema Registrando Documento');
        }
    }

    public function delete(Request $request){
        try {
            $documento = docs_x_activo::where('taqDoc','LIKE', $request -> taqDoc)->get();
            $filePath = public_path("/storage/Activos/{$documento[0]['taqActivos']}/Documentos/{$documento[0]['nombre']}");
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            docs_x_activo_eli::create([
                'taqDeleteRegister' => uniqid(TRUE),
                'taqActivos'        => $documento[0]['taqActivos'],
                'taqresponsable'    => Auth::user() -> taqresponsable,
                'nombreDocumento'   => $documento[0]['nombre'],
            ]);
            docs_x_activo::where('taqDoc','LIKE', $request -> taqDoc)->delete();
            return redirect()->route('activos.show', ['activos' => $documento[0]['taqActivos']]) ->with('status', 'Documento eliminado correctamente');
        } catch (\Throwable $th) {
            
            return redirect()->route('activos.show', ['activos' => $documento[0]['taqActivos']]) ->with('error', 'Problema eliminando el documento');
        }
    }
}
