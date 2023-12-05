<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use App\Models\cargos;
use App\Models\empresas;
use App\Models\responsable;
use App\Models\tipos_activo; 
use Illuminate\Http\Request;
 
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image; 

class EmpresasController extends Controller
{
    public function store(Request $request)
    {
        try {
            $duplicado  = count(empresas::where('taqempresa','LIKE',$request -> taqempresa)->get());
            if($duplicado <= 0){
                $image = $request->file('Image'); 
                if ($image != null) { 
                    $filename = $request->file('Image')->getClientOriginalName();  
                    $compressedImage = Image::make($image)->encode('jpg', 80); 
                    $rutaDestino = "Empresas/{$request->taqempresa}";
                    $rutaArchivo = "Empresas/{$request->taqempresa}/{$filename}";
                    if (!Storage::disk('public')->exists($rutaDestino)) {
                        Storage::disk('public')->makeDirectory($rutaDestino, 0777, true, true);
                    }
                    Storage::disk('public')->put($rutaArchivo, $compressedImage->stream());  
                    empresas::create([
                        'nombre'     => $request -> nombre,
                        'taqempresa' => $request -> taqempresa,
                        'urlImage'   => $filename,
                    ]);
                    return redirect()->route('empresa.show',['empresa' => $request -> taqempresa ]) -> with('status', 'Empresa Registrada Correctamente');
                }else{
                    empresas::create([
                        'nombre'     => $request -> nombre,
                        'taqempresa' => $request -> taqempresa,
                        'urlImage'   => 'default-image.jpg',
                    ]);
                    return redirect()->route('empresa.show',['empresa' => $request -> taqempresa ]) -> with('status', 'Empresa Registrada Correctamente');
                }
            }else{
                return redirect()->route('home') -> with('error', 'Ya existe una empresa con este TAQ');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home')->with('error', 'Problema Registrando Activo');
        }
    }

    public function show($taqempresa)
    {
        try {
            $exist = count(empresas::where('taqempresa','LIKE',$taqempresa)->get()); 
            if( $exist === 1 ){
                return Inertia::render('Empresa',[
                    'Empresa' => empresas::with( 
                        'Om.responsable', 
                        'Caracteristicas'
                    )->where('taqempresa','LIKE', $taqempresa) -> get(),
                    'Cargos' => cargos::all(), 
                    'CategoriasActivo'=>tipos_activo::all(),
                    'Responsables' => responsable::where([['cargo_id','LIKE','cargoid_63f4bc05f06712.19605041'],['estado','LIKE','VIGENTE']]) -> get(),
                    'status'                => session('status'),
                    'error'                 => session('error')
                ]);
            }else{
                return redirect()->route('home') -> with('error', 'Empresa no encontrada');
            }
        } catch (\Throwable $th) {
            
            return redirect()->route('home') -> with('error', 'Problema encontrando empresa'); 
        }
    }

    public function update(Request $request)
    {
        try {
            if($request -> File('Image')!=null){  
                $image = $request -> file('Image');
                $filename = $image->getClientOriginalName();  
                $compressedImage = Image::make($image)->encode('jpg', 80);  
                $rutaArchivo = "Empresas/{$request->taqempresa}/{$filename}";
                if (!Storage::disk('public')->exists($rutaArchivo)) {
                    Storage::disk('public')->delete($rutaArchivo);
                }
                Storage::disk('public')->put($rutaArchivo, $compressedImage->stream()); 
                empresas::where('taqempresa','LIKE',$request -> taqempresa)-> update([
                    'nombre'       => $request -> nombre,
                    'urlImage'     => $filename,
                ]);
                return redirect()->route('empresa.show', ['empresa' => $request->taqempresa]) -> with('status', 'Empresa Editada Correctamente');
            }else{
                empresas::where('taqempresa','LIKE',$request -> taqempresa)-> update([
                    'nombre'       => $request -> nombre
                ]);
                return redirect()->route('empresa.show', ['empresa' => $request->taqempresa]) -> with('status', 'Empresa Editada Correctamente');
            }
        } catch (\Throwable $th) { 
            return redirect()->route('empresa.show', ['empresa' => $request->taqempresa]) -> with('error', 'Problema  Editado Empresa');
        }
    }

}
