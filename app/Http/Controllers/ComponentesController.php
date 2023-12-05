<?php

namespace App\Http\Controllers;

use App\Models\componentes;
use App\Models\tipos_componentes;
 
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image; 

class ComponentesController extends Controller
{
    public function store(Request $request)
    {   
        try {
            $taqComponente  = '';
            $countTypes = count(componentes::where('id_tipo','LIKE',$request -> id_tipo)->get());
            $tipe       = tipos_componentes::where('id_tipo','LIKE',$request -> id_tipo)->get(); 
            if($countTypes<9){
                $taqComponente  = $tipe[0]['taq_componente_base'].'GW'.'_0'.$countTypes+1;
            }elseif( $countTypes >= 9 && $countTypes <= 99 ){
                $taqComponente  = $tipe[0]['taq_componente_base'].'GW'.'_'.$countTypes+1;
            } 
            if($request -> File('Image')!=null){
                $image = $request -> File('Image');
                $filename = $image->getClientOriginalName();  
                $compressedImage = Image::make($image)->encode('jpg', 80);  
                $rutaDestino = "Componentes/{$taqComponente}";
                $rutaArchivo = "Componentes/{$taqComponente}/{$filename}";
                if (!Storage::disk('public')->exists($rutaDestino)) {
                    Storage::disk('public')->makeDirectory($rutaDestino, 0777, true, true);
                }
                Storage::disk('public')->put($rutaArchivo, $compressedImage->stream());
                componentes::create([
                    'taqComponente' => $taqComponente, 
                    'id_tipo'       => $request -> id_tipo,
                    'nombre'        => $request -> nombre,
                    'descripcion'   => $request -> descripcion,
                    'serial'        => $request -> serial,
                    'horasuso'      => $request -> horasuso,
                    'urlImage'      => $filename,
                ]);
                return redirect()->route('componentes.show', [ 'componentes' => $taqComponente ]) -> with('status', 'Componente Registrado Correctamente');
            }else{
                componentes::create([
                    'taqComponente' => $taqComponente, 
                    'id_tipo'       => $request -> id_tipo,
                    'nombre'        => $request -> nombre,
                    'descripcion'   => $request -> descripcion,
                    'serial'        => $request -> serial,
                    'horasuso'      => $request -> horasuso,
                    'urlImage'      => 'default-image.jpg',
                ]);
                return redirect()->route('componentes.show', [ 'componentes' => $taqComponente ]) -> with('status', 'Componente Registrado Correctamente');
            }
        } catch (\Throwable $th) {
            
            return redirect()->route('home') -> with('error', 'Problema Registrando Componente');
        }
    }


    public function show($taqComponente)
    {
        try {
            $exist = count(componentes::where('taqComponente','LIKE',$taqComponente)->get()); 
            if( $exist === 1 ){ 
                return Inertia::render('Componente',[
                    'ComponentesData'  => componentes::with(
                        'Categoria',
                        'Actividades', 
                        'Caracteristicas',
                        'Documentos',
                        'Documentos_Eliminados',
                        'Certificaciones',
                        'Certificaciones_Eliminadas',
                        'Mttos_Correctivos.Responsable',
                        'Mttos_Correctivos.Actividades',
                        'Mttos_Correctivos.Documentos',
                        'Mttos_Preventivos.Responsable',
                        'Mttos_Preventivos.Actividades',
                        'Mttos_Preventivos.Documentos',
                    )->where('taqComponente','LIKE', $taqComponente)->get(),
                    'status' => session('status'),
                    'error'  => session('error')
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'Componente no encontrado');
            }
        } catch (\Throwable $th) {
            
            return redirect()->route('home') -> with('error', 'Problema encontrando componente');
        }
    }


    public function update(Request $request)
    {
        try {
            if($request -> File('Image')!=null){
                $Componente = componentes::where('taqComponente','LIKE',$request->taqComponente)->get(); 
                $image = $request -> File('Image');
                $filename = $image->getClientOriginalName();  
                $compressedImage = Image::make($image)->encode('jpg', 80);  
                $rutaArchivo = "Componentes/{$Componente[0]['taqComponente']}/{$filename}";
                if (!Storage::disk('public')->exists($rutaArchivo)) {
                    Storage::disk('public')->delete($rutaArchivo);
                }
                Storage::disk('public')->put($rutaArchivo, $compressedImage->stream());
                componentes::where('taqComponente','LIKE',$request -> taqComponente)-> update([
                    'nombre'       => $request -> nombre,
                    'descripcion'  => $request -> descripcion,
                    'serial'       => $request -> serial,
                    'dependencia'  => $request -> dependencia,
                    'horasuso'     => $request -> horasuso,
                    'urlImage'     => $filename,
                ]);
                return redirect()->route('componentes.show', ['componentes' => $request->taqComponente]) -> with('status', 'Componente Editado Correctamente');
            }else{
                componentes::where('taqComponente','LIKE',$request -> taqComponente)-> update([
                    'nombre'       => $request -> nombre,
                    'descripcion'  => $request -> descripcion,
                    'serial'       => $request -> serial,
                    'dependencia'  => $request -> dependencia,
                    'horasuso'     => $request -> horasuso,
                ]);
                return redirect()->route('componentes.show', ['componentes' => $request->taqComponente]) -> with('status', 'Componente Editado Correctamente');
            }
        } catch (\Throwable $th) {
            return redirect()->route('componentes.show', ['componentes' => $request->taqComponente]) -> with('error', 'Problema  Editado Componente');
        }
    }
}
