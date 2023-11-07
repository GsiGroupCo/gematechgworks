<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\docs; 
use Illuminate\Support\Facades\File;
Use Session;

class documentsController extends Controller
{
    public function store(Request $request)
    { 
        try { 
            $taqdocumento  = uniqid(TRUE);  
            for ($i = 1; $i <= $request -> CantImages; $i++) {
                $documento = $request -> file('Image_'.$i);
                $nombre = $documento -> getClientOriginalName();
                $ruta = "/home/gematech/public_html/storage/Activos/".$request->taqActivos."/Documentos";
                $documento->move($ruta, $nombre);
                docs::create([
                    'taqDoc' => $taqdocumento,
                    'nombre' => $nombre, 
                ]); 
            }
            return redirect()->route('home')->with('status', 'Documento Registrado Correctamente');
        } catch (\Throwable $th) {
            dd($th);
            return redirect()->route('home')->with('error', 'Problema Registrando Activo');
        }
    }
    
    public function delete($taqDoc){ 
        try {
            $exist = docs::where('taqDoc,LIKE',$taqDoc)->get()->count();   
            if($exist > 0){
                $documento = docs::where('taqDoc,LIKE',$taqDoc)->get();
                $file_path = public_path().'/storage/Documentos/'.$documento[0]['nombre'];
                if (File::exists($file_path)) {
                    File::delete($file_path);
                }
                return redirect()->route('home')->with('status', 'Documento Eliminado Correctamente');
            }else{
                return redirect()->route('home')->with('error', 'Problema Eliminado Documento');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home')->with('error', 'Problema Eliminado Documento');
        }
    }

}
