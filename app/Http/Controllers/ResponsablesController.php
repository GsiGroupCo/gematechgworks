<?php

namespace App\Http\Controllers;

use App\Models\cargos;
use App\Models\responsable;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image; 

class ResponsablesController extends Controller
{
    public function store(Request $request)
    { 
        $taqresponsable = uniqid(TRUE);
        if($request -> File('Image')!=null){ 
            $image = $request-> file('Image');
            $filename = $image->getClientOriginalName();  
            $compressedImage = Image::make($image)->encode('jpg', 80); 
            $rutaDestino = "Responsables/{$taqresponsable}";
            $rutaArchivo = "Responsables/{$taqresponsable}/{$filename}";
            if (!Storage::disk('public')->exists($rutaDestino)) {
                Storage::disk('public')->makeDirectory($rutaDestino, 0777, true, true);
            }
            Storage::disk('public')->put($rutaArchivo, $compressedImage->stream()); 
            $filename = $request->file('Image')->getClientOriginalName();
            $request->File('Image')->move(public_path() . "/storage/" . "Responsables/" . $request -> taqresponsable  , $filename);
            responsable::create([
                'taqresponsable' => $taqresponsable,
                'nombre'         => $request -> nombre,
                'cargo_id'       => $request -> cargo_id,
                'estado'         => 'VIGENTE',
                'Image'          => $filename,
            ]);
            return redirect()->route('responsables.show', ['responsables' => $taqresponsable]) -> with('status', 'Responsable Creado Correctamente');
        }else{
            responsable::create([
                'taqresponsable'   => $taqresponsable, 
                'nombre'           => $request -> nombre,
                'cargo_id'         => $request -> cargo_id,
                'estado'           => 'VIGENTE',
                'Image'            => 'default-image.jpg',
            ]);
            return redirect()->route('responsables.show', ['responsables' => $taqresponsable]) -> with('status', 'Responsable Creado Correctamente');
        }
    }
    
    public function show($taqresponsable)
    {
        
        $exist = count(responsable::where('taqresponsable','LIKE',$taqresponsable)->get());
        try {
            if($exist === 1){
                return Inertia::render('Responsable',[
                    'Responsable' => responsable::with(
                        'Documentos',
                        'Trabajo.Om.empresa',
                        'Mantenimiento_Correctivo_Activos.Activo',
                        'Mantenimiento_Preventivos_Activos.Activo',
                        'Actividades_Correctivas_Pendientes_Activos',
                        'Actividades_Correctivas_Finalizadas_Activos'
                    )->where('taqresponsable', 'LIKE', $taqresponsable)->get(),
                    'Cargos'        => cargos::all(),
                    'Responsables'  => responsable::where('estado','LIKE','VIGENTE')->get(),
                    'status'        => session('status'),
                    'error'         => session('error')
                ]);
            }else{
                return redirect()->route('home') -> with('error', 'Responsable no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect()->route('home') -> with('error', 'Problema encontrando responsable'); 
        }
    }

    public function update(Request $request)
    {
        try {
            if($request -> File('Image')!=null){
                $responsable = responsable::where('taqresponsable','LIKE',$request->taqresponsable)->get(); 
                $image = $request -> File('Image');
                $filename = $image->getClientOriginalName();  
                $compressedImage = Image::make($image)->encode('jpg', 80);  
                $rutaArchivo = "Responsables/{$responsable[0]['taqresponsable']}/{$filename}";
                if (!Storage::disk('public')->exists($rutaArchivo)) {
                    Storage::disk('public')->delete($rutaArchivo);
                }
                Storage::disk('public')->put($rutaArchivo, $compressedImage->stream()); 
                responsable::where('taqresponsable','LIKE',$request -> taqresponsable)-> update([ 
                    'nombre' => $request   -> nombre,
                    'cargo'  => $request   -> cargo_id,
                    'Image'  => $filename,
                ]);
                return redirect()->route('responsables.show', ['responsables' => $request->taqresponsable]) -> with('status', 'Responsable Actualizado Correctamente');
            }else{
                responsable::where('taqresponsable','LIKE',$request -> taqresponsable)-> update([
                    'primernombre'       => $request -> primernombre,
                    'segundonombre'      => $request -> segundonombre,
                    'primerapellido'     => $request -> primerapellido,
                    'segundoapellido'    => $request -> segundoapellido,
                    'cargo'              => $request -> cargo_id,
                ]);
                return redirect()->route('responsables.show', ['responsables' => $request->taqresponsables]) -> with('status', 'Responsable Actualizado Correctamente');
            }
        } catch (\Throwable $th) {
            return redirect()->route('responsables.show', ['responsables' => $request->taqresponsable]) -> with('error', 'Problema  Actualizando Responsable');
        }
    }

    public function ascend(Request $request)
    {
        try {
            responsable::where('taqresponsable','LIKE',$request -> taqresponsable)-> update([
                'estado' => 'INACTIVO',
            ]);
            return redirect()->route('responsables.show', ['responsables' => $request->taqresponsable]) -> with('status', 'Estado de responsable actualizado');
        } catch (\Throwable $th) {
            return redirect()->route('responsables.show', ['responsables' => $request->taqresponsable]) -> with('error', 'Problema  actualizando estado de responsable');
        }
    }

}
