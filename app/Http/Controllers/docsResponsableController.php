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

    // public function storeMtto(Request $request)
    // {
    //     $documento = $request->file('docFile');
    //     if($documento!=null){
    //         // $nombre = $documento -> getClientOriginalName();
    //         // Storage::disk('local')->put($nombre,\File::get($documento));

    //         $filename =  time() . '.' . $request->File('docFile')->getClientOriginalExtension();
    //         $request->File('docFile')->move(public_path() . "/storage/docs/documents", $filename);

    //         docsmttoactivo::create([
    //             'taqDocMttoActivo' => uniqid('DOC-MTTO-',TRUE),
    //             'taqActivos'       => $request -> taqActivos,
    //             'nombre'           => $filename,
    //             'DocURL'           => 'storage/docs/documents/'.$filename,
    //         ]);
    //         Session::flash('UpdateDoc','Documento subido con exito');
    //         return redirect()->route('activos.show',$request -> taqActivos);
    //     }else{
    //         Session::flash('Docnotfound','Por favor seleccione un docmuento primero');
    //         return redirect()->route('activos.show',$request -> taqActivos);
    //     }
    // }

    // public function show($taqActivos,$taqDoc){
    //     return view('activo/document',[
    //         'profile' => activos::where('taqActivos','LIKE', $taqActivos)->get(),
    //         'file'    => Activos_document::where('taqDoc', 'LIKE', $taqDoc)->get(),
    //     ]);
    // }

    // public function showMtto($taqActivos,$taqDocMttoActivo){
    //     return view('activo/document',[
    //         'profile' => activos::where('taqActivos','LIKE', $taqActivos)->get(),
    //         'file'    => docsmttoactivo::where('taqDocMttoActivo', 'LIKE', $taqDocMttoActivo)->get(),
    //     ]);
    // }

    // public function delete(DeleteDocumentActivoRequest $request){
    //     $file = Activos_document::where('taqDoc','LIKE',$request -> taqDoc)->get();

    //     $file_path = public_path().'\storage/docs/documents/'.$file[0]['nombre'];
    //     File::delete($file_path);

    //     Activos_document::where('taqDoc','LIKE',$request -> taqDoc)-> delete();

    //     documentsDelete::create([
    //         'taqDeleteRegister'  =>  uniqid('DELETEREGISTER',TRUE),
    //         'taqActivos'         =>  $request -> taqActivos,
    //         'nombreDocumento'    =>  $file[0]['nombre'],
    //         'taqresponsable'     =>  $request -> taqresponsable,
    //     ]);

    //     Session::flash('DeleteDocument','Documento Borrado con exito');
    //     return redirect()->route('activos.show',$file[0]['taqActivos']);
    // }

    // public function deleteMtto(DeleteDocumentMttoActivoRequest $request){
    //     $file = docsmttoactivo::where('taqDocMttoActivo','LIKE',$request -> taqDocMttoActivo)->get();

    //     $file_path = public_path().'\storage/docs/documents/'.$file[0]['nombre'];
    //     File::delete($file_path);

    //     docsmttoactivo::where('taqDocMttoActivo','LIKE',$request -> taqDocMttoActivo)-> delete();

    //     documentosMttoDelete::create([
    //         'taqDeleteRegister'  =>  uniqid('DELETEREGISTER',TRUE),
    //         'taqActivos'         =>  $request -> taqActivos,
    //         'taqDocMttoActivo'   =>  $file[0]['taqDocMttoActivo'],
    //         'nombreDocumento'    =>  $file[0]['nombre'],
    //         'taqresponsable'     =>  $request -> taqresponsable,
    //     ]);

    //     Session::flash('DeleteDocument','Documento Borrado con exito');
    //     return redirect()->route('activos.show',$file[0]['taqActivos']);
    // }
}
