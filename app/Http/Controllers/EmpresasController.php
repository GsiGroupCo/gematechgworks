<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use App\Models\cargos;
use App\Models\empresas;
use App\Models\responsable;
use App\Models\tipos_activo;
use App\Models\tipos_herramienta;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\File;
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
                    $ruta = "/home/gematech/public_html/storage/Empresas/".$request->taqempresa."/"; 
                    $compressedImage = Image::make($image)->encode('jpg', 80); 
                    $request->File('Image')->move($ruta, $filename, $compressedImage->stream());
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
            dd($th);
            return redirect()->route('home') -> with('error', 'Problema encontrando empresa'); 
        }
    }

    public function update(Request $request)
    {
        try {
            if($request -> File('Image')!=null){
                $activo = empresas::where('taqempresa','LIKE',$request->taqempresa)->get();
                $filePath = public_path("/storage/{$activo[0]['urlImage']}");
                if (File::exists($filePath)) {
                    File::delete($filePath);
                }
                $filename = $request->file('Image')->getClientOriginalName();
                $request->File('Image')->move(public_path()."/storage/".$request->taqempresa."/", $filename);
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
            dd($th);
            return redirect()->route('empresa.show', ['empresa' => $request->taqempresa]) -> with('error', 'Problema  Editado Empresa');
        }
    }

}
