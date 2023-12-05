<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\activos; 
use App\Models\om;
use App\Models\area;
use App\Models\componentes;
use App\Models\empresas;
use App\Models\mantenimientos; 
use App\Models\responsable;
use App\Models\tipos_activo;
 
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image; 


class ActivosController extends Controller
{
 
    public function store(Request $request)
    {
        try { 
            $taqActivo  = '';
            $countTypes = count(activos::where('id_tipo','LIKE',$request -> id_tipo)->get());
            $tipe       = tipos_activo::where('id_tipo','LIKE',$request -> id_tipo)->get();
            if($countTypes<9){ 
                $taqActivo  = $tipe[0]['taq_activo_base'].'GW'.'_0'.$countTypes+1; 
            }elseif( $countTypes >= 9 && $countTypes <= 99 ){
                $taqActivo  = $tipe[0]['taq_activo_base'].'GW'.'_'.$countTypes+1;
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
                activos::create([
                    'taqActivos' => $taqActivo, 
                    'id_tipo' => $request->id_tipo,
                    'nombre' => $request->nombre,
                    'descripcion' => $request->descripcion,
                    'serial' => $request->serial, 
                    'horasuso' => $request->horasuso,
                    'urlImage' => $filename,
                ]); 
                return redirect()->route('activos.show', ['activos' => $taqActivo])->with('status', 'Activo Registrado Correctamente');
            } else { 
                activos::create([
                    'taqActivos' => $taqActivo, 
                    'id_tipo' => $request->id_tipo,
                    'nombre' => $request->nombre,
                    'descripcion' => $request->descripcion, 
                    'modelo' => $request->modelo,
                    'serial' => $request->serial,
                    'horas_uso' => $request->horas_uso,
                    'urlImage' => "default-image.jpg",
                ]);
                return redirect()->route('activos.show', ['activos' => $taqActivo])->with('status', 'Activo Registrado Correctamente');
            }
        } catch (\Throwable $th) {
            dd($th);
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
                        'Tipo',
                        'Mantenimientos',
                        'Documentos',
                        'Documentos_Eliminados',
                        'Certificaciones',
                        'Certificaciones_Eliminadas',
                        'Movimiento',
                        'Mantenimientos_Preventivos',
                        'Mantenimientos_Correctivos',
                        'Componente'
                    )->where('taqActivos','LIKE',$activo)->get(),
                    "Activos" => activos::all(),
                    "Areas" => area::all(),
                    "oms" => om::all(),
                    "Empresas" => empresas::all(),
                    "Componentes" => componentes::all(),
                    "Tipo" => tipos_activo::all(),
                    "Responsables" => responsable::all(),
                    "Mantenimientos" => mantenimientos::all(),
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
                activos::where('taqActivos','LIKE',$request -> taqActivos)-> update([
                    'nombre'       => $request -> nombre,
                    'descripcion'  => $request -> descripcion,
                    'serial'       => $request -> serial, 
                    'horasuso'     => $request -> horasuso,
                    'urlImage'     => $filename,
                ]);
                return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Activo Editado Correctamente');
            }else{ 
                activos::where('taqActivos','LIKE',$request -> taqActivos)-> update([
                    'nombre'       => $request -> nombre,
                    'descripcion'  => $request -> descripcion,
                    'serial'       => $request -> serial, 
                    'horasuso'     => $request -> horasuso,
                ]);
                return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('status', 'Activo Editado Correctamente');
            }
        } catch (\Throwable $th) {  
            return redirect()->route('activos.show', ['activos' => $request->taqActivos]) -> with('error', 'Problema  Editado Activo');
        }
    }
}
