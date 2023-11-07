<?php

namespace App\Http\Controllers;

use App\Models\caracteristicas_x_herramientas;
use App\Models\empresas;
use App\Models\herramienta;
use App\Models\responsable;
use App\Models\tipos_herramienta;

use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HerramientasController extends Controller
{
    public function store(Request $request)
    {
        try {
            $taqHer  = '';
            $countTypes = count(herramienta::where('id_tipo','LIKE',$request -> id_tipo)->get());
            $tipe       = tipos_herramienta::where('id_tipo','LIKE',$request -> id_tipo)->get();
            if($countTypes<9){
                $taqHer  = $tipe[0]['taq_herramienta_base'].$request->taqempresa.'_0'.$countTypes+1;
            }elseif( $countTypes >= 9 && $countTypes <= 99 ){
                $taqHer  = $tipe[0]['taq_herramienta_base'].$request->taqempresa.'_'.$countTypes+1;
            }
            $duplicado = count(herramienta::where('taqHer','LIKE',$taqHer)->get());
            if($duplicado <= 0){
                if($request -> File('Image')!=null){
                    $filename = $request->file('Image')->getClientOriginalName();
                    $ruta = "/home/gematech/public_html/storage/Herramientas/".$taqHer."/";
                    $request->File('Image')->move($ruta, $filename);
                    herramienta::create([
                        'taqHer'            => $taqHer,
                        'taqempresa'        => $request -> taqempresa,
                        'id_tipo'           => $request -> id_tipo,
                        'nombre'            => $request -> nombre,
                        'serial'            => $request -> serial,
                        'area'              => $request -> area,
                        'horasuso'          => $request -> horasuso,
                        'urlImage'          => $filename,     
                    ]);
                    return redirect()->route('herramientas.show', [ 'taqHer' => $taqHer ]) -> with('status', 'Herramienta Registrada Correctamente');
                }else{
                    herramienta::create([
                        'taqHer'            => $taqHer,
                        'taqempresa'        => $request -> taqempresa,
                        'id_tipo'           => $request -> id_tipo,
                        'nombre'            => $request -> nombre,
                        'serial'            => $request -> serial,
                        'area'              => $request -> area,
                        'horasuso'          => $request -> horasuso,
                        'urlImage'          => "default-image.jpg",
                    ]);
                    return redirect()->route('herramientas.show', [ 'taqHer' => $taqHer ]) -> with('status', 'Herramienta Registrada Correctamente');
                }
            }else{
                return redirect()->route('home') -> with('error', 'Ya existe una herramienta con este TAQ');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema Registrando Herramienta');
        }
    }

    public function clone(Request $request)
    {
        try {
            $taqHer  = '';
            $countTypes = count(herramienta::where('id_tipo','LIKE',$request -> id_tipo)->get());
            $tipe       = tipos_herramienta::where('id_tipo','LIKE',$request -> id_tipo)->get();
            if($countTypes<9){
                $taqHer  = $tipe[0]['taq_herramienta_base'].$request->taqempresa.'_0'.$countTypes+1;
            }elseif( $countTypes >= 9 && $countTypes <= 99 ){
                $taqHer  = $tipe[0]['taq_herramienta_base'].$request->taqempresa.'_'.$countTypes+1;
            }
            $duplicado = count(herramienta::where('taqHer','LIKE',$taqHer)->get());
            if($duplicado <= 0){
                if($request -> File('Image')!=null){
                    $filename = $request->file('Image')->getClientOriginalName();
                    $ruta = "/home/gematech/public_html/storage/Herramientas/".$taqHer."/";
                    $request->File('Image')->move($ruta, $filename);
                    herramienta::create([
                        'taqHer'            => $taqHer,
                        'taqempresa'        => $request -> taqempresa,
                        'id_tipo'           => $request -> id_tipo,
                        'nombre'            => $request -> nombre,
                        'serial'            => $request -> serial,
                        'area'              => $request -> area,
                        'horasuso'          => $request -> horasuso,
                        'urlImage'          => $filename,     
                    ]);
                    return redirect()->route('home') -> with('status', 'Herramienta Registrada Correctamente');
                }else{
                    herramienta::create([
                        'taqHer'            => $taqHer,
                        'taqempresa'        => $request -> taqempresa,
                        'id_tipo'           => $request -> id_tipo,
                        'nombre'            => $request -> nombre,
                        'serial'            => $request -> serial,
                        'area'              => $request -> area,
                        'horasuso'          => $request -> horasuso,
                        'urlImage'          => "default-image.jpg",
                    ]);
                    return redirect()->route('home') -> with('status', 'Herramienta Registrada Correctamente');
                }
            }else{
                return redirect()->route('home') -> with('error', 'Ya existe una herramienta con este TAQ');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema Registrando Herramienta');
        }
    }

    public function show($taqHer)
    {
        try {
            $exist = count(herramienta::where('taqHer','LIKE',$taqHer)->get());
            if( $exist === 1 ){
                return Inertia::render('Herramienta',[
                    'herramienta' => herramienta::with(
                        'Movimientos.Responsable',
                        'Empresa',
                        'Caracteristicas',
                        'Documentos',
                        'Documentos_Eliminados.Responsable',
                        'Mantenimientos_Correctivos',
                        'Mantenimientos_Preventivo',
                        'Documentos_Mantenimiento_Correctivo',
                        'Documentos_Mantenimiento_Correctivo_Eliminados',
                        'Documentos_Mantenimiento_Preventivo',
                        'Documentos_Mantenimiento_Preventivo_Eliminado'
                    )->where('taqHer','LIKE',$taqHer)->get(),
                    'Empresas'      => empresas::all(),
                    'Categorias' => tipos_herramienta::all(),
                    'Caracteristicas' => caracteristicas_x_herramientas::where( 'taqHer','LIKE',$taqHer )->get(),
                    'Responsables' => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'status'       => session('status'),
                    'error'        => session('error')
                ]);
            }else{
                return redirect()->route('home') -> with('error', 'Herramienta no encontrada');
            }
        } catch (\Throwable $th) { 
            return redirect()->route('home') -> with('error', 'Problema encontrando herramienta');
        }
    }

    public function update(Request $request)
    {     
        try {
            if($request -> File('Image')!=null){
                $herramienta = herramienta::where('taqHer','LIKE',$request->taqHer)->get(); 
                $filePath = "/home/gematech/public_html/storage/Herramientas/{$herramienta[0]['urlImage']}";
                if (File::exists($filePath)) {
                    File::delete($filePath);
                }
                $filename = $request->file('Image')->getClientOriginalName();
                $ruta = "/home/gematech/public_html/storage/Herramientas/".$request -> taqHer."/";
                $request->File('Image')->move($ruta, $filename);
                herramienta::where('taqHer','LIKE',$request -> taqHer)-> update([
                    'nombre'       => $request -> nombre,
                    'serial'       => $request -> serial,
                    'area'         => $request -> area,
                    'horasuso'     => $request -> horasuso,
                    'urlImage'     => $filename,
                ]);
                return redirect()->route('herramientas.show', ['taqHer' => $request->taqHer]) -> with('status', 'Herramienta Editada Correctamente');
            }else{
                herramienta::where('taqHer','LIKE',$request -> taqHer)-> update([
                    'nombre'       => $request -> nombre,
                    'serial'       => $request -> serial,
                    'area'         => $request -> area,
                    'horasuso'     => $request -> horasuso,
                ]);
                return redirect()->route('herramientas.show', ['taqHer' => $request->taqHer]) -> with('status', 'Herramienta Editada Correctamente');
            }
        } catch (\Throwable $th) { 
            return redirect()->route('herramientas.show', ['taqHer' => $request->taqHer]) -> with('error', 'Problema  Editado Herramienta');
        }
    }
}
