<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\activos; 
use App\Models\om;
use App\Models\categorias_activo;
use App\Models\componentes;
use App\Models\oma;
use App\Models\responsable;
use App\Models\rigs;
 
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image; 


class ActivosController extends Controller
{
 
    public function store(Request $request)
    {
        try {   
            $taqActivo  = '';
            $countTypes = count(activos::where('categoria_id','LIKE',$request -> categoria_id)->get());
            $tipe = categorias_activo::where('categoria_id','LIKE',$request -> categoria_id)->get(); 
            if($countTypes<9){ 
                $taqActivo  = $tipe[0]['taq'].'GW'.'_0'.$countTypes+1; 
            }elseif( $countTypes >= 9 && $countTypes <= 99 ){
                $taqActivo  = $tipe[0]['taq'].'GW'.'_'.$countTypes+1;
            }
            $image = $request->file('Image');
            if ($image != null) { 
                $filename = $request->file('Image')->getClientOriginalName();  
                $compressedImage = Image::make($image)->encode('jpg', 80);
                $rutaDestino = "Activo/{$taqActivo}";
                $rutaArchivo = "Activo/{$taqActivo}/{$filename}";
                if (!Storage::disk('public')->exists($rutaDestino)) {
                    Storage::disk('public')->makeDirectory($rutaDestino, 0777, true, true);
                }
                Storage::disk('public')->put($rutaArchivo, $compressedImage->stream());
            } 
            activos::create([
                'taqActivos'   => $taqActivo, 
                'categoria_id' => $request->categoria_id,
                'nombre'       => $request->nombre,
                'descripcion'  => $request->descripcion,
                'serial'       => $request->serial, 
                'horasuso'     => $request->horasuso,
                'estado'       => 'VIGENTE',
                'urlImage'     => $image!= null ? $filename : 'default-image.jpg',
            ]); 
            return redirect()->route('activos.show', ['activos' => $taqActivo])->with('status', 'Activo Registrado Correctamente');
        } catch (\Throwable $th) {
            return redirect()->route('home')->with('error', 'Problema Registrando Activo');
        }
    }


    public function show($activo)
    {
        try {
            $exist = count(activos::where('taqActivos','LIKE',$activo)->get());  
            if( $exist === 1 ){  
                return Inertia::render('Activo',[
                    "Activo" => activos::with(
                        'Categoria',
                        'OrdenesMantenimiento.Responsable',
                        'Historial.Componente',
                        'Galeria',
                        'Movimiento.Rig',
                        'Caracteristicas',
                        'Documentos',
                        'Documentos_Eliminados',
                        'Certificaciones',
                        'Certificaciones_Eliminadas'
                    )->where('taqActivos','LIKE',$activo)->get(),
                    "Rigs" => rigs::all(),
                    "Activos" => activos::all(),
                    "oms" => oma::all(),
                    "Componentes" => componentes::all(),
                    "CategoriasActivo" => categorias_activo::all(),
                    "Responsables" => responsable::all()
                ]); 
            }else{
                return redirect()->route('home') -> with('error', 'Activo no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando activo');
        }
        
    }


    public function update(Request $request)
    {
        try {   
            if($request -> File('Image')!=null){ 
                $activo = activos::where('taqActivos','LIKE',$request->taqActivos)->get(); 
                $image = $request -> File('Image');
                $filename = $image->getClientOriginalName();  
                $compressedImage = Image::make($image)->encode('jpg', 80);  
                $rutaArchivo = "Activo/{$activo[0]['taqActivo']}/{$filename}";
                if (!Storage::disk('public')->exists($rutaArchivo)) {
                    Storage::disk('public')->delete($rutaArchivo);
                }
                Storage::disk('public')->put($rutaArchivo, $compressedImage->stream());
            }
            activos::where('taqActivos','LIKE',$request -> taqActivos)-> update([
                'nombre'       => $request -> nombre,
                'descripcion'  => $request -> descripcion,
                'serial'       => $request -> serial, 
                'horasuso'     => $request -> horasuso,
                'urlImage'     => $request -> File('Image') != null ? $filename : $activo[0]['urlImage'],
            ]);
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Activo Editado Correctamente');
        } catch (\Throwable $th) {  
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'Problema  Editado Activo');
        }
    }
}
