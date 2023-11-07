<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\docsmantocorrectivaactivo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
Use Session;

class DocumentHerramientaController extends Controller
{
    public function storeActivo(Request $request)
    {
        $cant_info = count(docsmantocorrectivaactivo::all());
        $documento = $request->file('docFile');

        if($documento!=null){
            
            // $nombre = $documento -> getClientOriginalName();
            // Storage::disk('local') -> put($nombre,\File::get($documento));
            
            $filename =  time() . '.' . $request->File('docFile')->getClientOriginalExtension();
            $request->File('docFile')->move(public_path() . "/storage/docs/documents", $filename);

            docsmantocorrectivaactivo::create([
                'taqdocactcorr' => uniqid('DOC-',TRUE),
                'taqmttActivo'  => $request -> taqmttActivo,
                'nombre'        => $filename,
                'DocURL'        => 'storage/docs/documents/'.$filename,
            ]);
            Session::flash('UpdateDocCor','Documento subido con exito');
            return redirect()->route('mantocorrActivo.show', $request -> taqmttActivo);
        }else{
            Session::flash('DocCornotfound','Por favor seleccione un docmuento primero');
            return redirect()->route('mantocorrActivo.show', $request -> taqmttActivo);
        }
    }

    public function storeHerramienta(Request $request)
    {
        $cant_info = count(documentmantocorrectivaherramienta::all());
        $documento = $request->file('docFile');

        if($documento!=null){
            // $nombre = $documento -> getClientOriginalName();
            // Storage::disk('local') -> put($nombre,\File::get($documento));
            $filename =  time() . '.' . $request->File('docFile')->getClientOriginalExtension();
            $request->File('docFile')->move(public_path() . "/storage/docs/documents", $filename);
            documentmantocorrectivaherramienta::create([
                'taqdocactcorr' => uniqid('DOC-',TRUE),
                'taqmttActivo'  => $request -> taqmttActivo,
                'nombre'        => $filename,
                'DocURL'        => 'storage/docs/documents/'.$filename,
            ]);
            Session::flash('UpdateDoc','Documento subido con exito');
            return redirect()->route('mantocorrActivo.show', $request -> taqmttActivo);
        }else{
            Session::flash('Docnotfound','Por favor seleccione un docmuento primero');
            return redirect()->route('mantocorrActivo.show', $request -> taqmttActivo);
        }
    }

    public function deleteActivo(Request $request){

        $file = docsmantocorrectivaactivo::where('taqdocactcorr','LIKE',$request -> taqdocactcorr)->get();
        $file_path = public_path().'\storage/docs/documents/'.$file[0]['nombre'];
        File::delete($file_path);
        docsmantocorrectivaactivo::where('taqdocactcorr','LIKE',$request -> taqdocactcorr)-> delete();
        Session::flash('DeleteDocument','Documento Borrado con exito');
        return redirect()->route('mantocorrActivo.show', $request -> taqmttActivo);

    }

    public function deleteHerramienta($taqdocactcorr){

        $file = documentmantocorrectivaherramienta::where('taqdocactcorr','LIKE',$taqdocactcorr)->get();
        $file_path = public_path().'\storage/docs/documents/'.$file[0]['nombre'];
        File::delete($file_path);
        documentmantocorrectivaherramienta::where('taqdocactcorr','LIKE',$taqdocactcorr)-> delete();
        Session::flash('DeleteDocument','Documento Borrado con exito');
        return redirect()->route('mantocorrActivo.show', $request -> taqmttActivo);

    }

}
