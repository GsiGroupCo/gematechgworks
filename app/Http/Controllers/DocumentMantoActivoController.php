<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\docsmantopreventivoactivo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
Use Session;

class DocumentMantoActivoController extends Controller
{
    public function store(Request $request)
    {
        $cant_info = count(docsmantopreventivoactivo::all());
        $documento = $request->file('docFile');

        if($documento!=null){
            
            //$nombre = $documento -> getClientOriginalName();
            //Storage::disk('local') -> put($nombre,\File::get($documento));
            
            $filename =  time() . '.' . $request->File('docFile')->getClientOriginalExtension();
            $request->File('docFile')->move(public_path() . "/storage/docs/documents", $filename);

            docsmantopreventivoactivo::create([
                'taqdocactprev' => uniqid('DOC-PREV',TRUE),
                'taqmttActivo'  => $request -> taqmttActivo,
                'nombre'        => $filename,
                'DocURL'        =>'/storage/docs/documents/'.$filename,
            ]);
            Session::flash('UpdateDocCor','Documento subido con exito');
            return redirect()->route('mantoPrevActivo.show', $request -> taqmttActivo);
        }else{
            Session::flash('DocCornotfound','Por favor seleccione un docmuento primero');
            return redirect()->route('mantoPrevActivo.show', $request -> taqmttActivo);
        }
    }

    public function deleteActivo(Request $request){

        $file = docsmantopreventivoactivo::where('taqdocactprev','LIKE',$request -> taqdocactprev)->get();
        $file_path = public_path().'/storage/docs/documents/'.$file[0]['nombre'];
        File::delete($file_path);
        docsmantopreventivoactivo::where('taqdocactprev','LIKE',$request -> taqdocactprev)-> delete();
        Session::flash('DeleteDocument','Documento Borrado con exito');
        return redirect()->route('mantoPrevActivo.show', $request -> taqmttActivo);

    }

}
