<?php


namespace App\Http\Controllers;

use App\Models\Trabajo;
use App\Models\ot;
use App\Models\Recurso;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\RecursoRequest;
use Illuminate\Support\Facades\Redirect;
Use Session;

class RecursoController extends Controller
{
    public function store(RecursoRequest $request)
    {
        if($request -> File('urlImage')!=null){

            $foto = $request->file('urlImage');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));

            Recurso::create([
                'id_recurso'            => uniqid($request -> id_requesicion,TRUE),
                'descipcion'            => $request -> descripcion,
                'justificacion'         => $request -> justificacion,
                'referencia'            => $request -> referencia,
                'marca'                 => $request -> marca,
                'unidad_medida'         => $request -> unidad_medida,
                'cantidad_solicitada'   => $request -> cantidad_solicitada,
                'cantidad_aprobada'     => '0',
                'estado'                => 'ACTIVO',
                'urlImage'              => 'urlImage/'.$nombre,
                'id_requesicion'        => $request -> id_requesicion,
            ]);
            Session::flash('recursonew','Se ha registrado el nuevo  Recurso correctamente.');
            return redirect()->route('requerimientos.show',$request->id_requesicion);
        }else{
            Recurso::create([
                'id_recurso'            => uniqid($request -> id_requesicion,TRUE),
                'descripcion'           => $request -> descripcion,
                'justificacion'         => $request -> justificacion,
                'referencia'            => $request -> referencia,
                'marca'                 => $request -> marca,
                'unidad_medida'         => $request -> unidad_medida,
                'cantidad_solicitada'   => $request -> cantidad_solicitada,
                'cantidad_aprobada'     => '0',
                'estado'                => 'ACTIVO',
                'urlImage'              => "urlImage/default-image.jpg",
                'id_requesicion'        => $request -> id_requesicion,
            ]);

            Session::flash('recursonew','Se ha registrado el nuevo  Recurso correctamente.');
            return redirect()->route('requerimientos.show',$request->id_requesicion);
        }

    }

    public function update(Request $request)
    {
        if($request -> File('urlImage')!=null){
            $foto = $request->file('urlImage');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));

            Recurso::where('id_recurso','LIKE',$request -> id_recurso)-> update([
                'descripcion'           => $request -> descripcion,
                'justificacion'         => $request -> justificacion,
                'referencia'            => $request -> referencia,
                'marca'                 => $request -> marca,
                'unidad_medida'         => $request -> unidad_medida,
                'cantidad_solicitada'   => $request -> cantidad_solicitada,
                'urlImage'              => 'urlImage/'.$nombre,
            ]);
            Session::flash('recursoupdate','Recurso actualizado correctamente');            
            return redirect()->route('requerimientos.show',$request->id_requesicion);
        }else{
            Recurso::where('id_recurso','LIKE',$request -> id_recurso)-> update([
                'descripcion'           => $request -> descripcion,
                'justificacion'         => $request -> justificacion,
                'referencia'            => $request -> referencia,
                'marca'                 => $request -> marca,
                'unidad_medida'         => $request -> unidad_medida,
                'cantidad_solicitada'   => $request -> cantidad_solicitada,
            ]);
            Session::flash('recursoupdate','Recurso actualizado correctamente');            
            return redirect()->route('requerimientos.show',$request->id_requesicion);
        }
    }

}
