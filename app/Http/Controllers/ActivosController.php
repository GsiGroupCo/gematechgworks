<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\activos;
use App\Models\movimientos_x_activos;
use App\Models\caracteristicas_x_activo;
use App\Models\om;
use App\Models\area;
use App\Models\componentes;
use App\Models\empresas;
use App\Models\mantenimientos;
use App\Models\mtto_corr_x_activos;
use App\Models\mtto_prev_x_activos;
use App\Models\responsable;
use App\Models\tipos_activo;

use Illuminate\Support\Facades\File;
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
                $ruta = "/home/gematech/public_html/storage/Activos/".$taqActivo; 
                $compressedImage = Image::make($image)->encode('jpg', 80); 
                $request->File('Image')->move($ruta, $filename, $compressedImage->stream()); 
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
                $filePath = "/home/gematech/public_html/storage/Activos/".$request->taqActivos."/{$activo[0]['urlImage']}";
                if (File::exists($filePath)) {
                    File::delete($filePath);
                }
                $filename = $request->file('Image')->getClientOriginalName();  
                $ruta = "/home/gematech/public_html/storage/Activos/".$request->taqActivos;
                $image = $request->file('Image');
                $compressedImage = Image::make($image)->encode('jpg', 80); 
                $request->File('Image')->move($ruta, $filename, $compressedImage->stream());
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
