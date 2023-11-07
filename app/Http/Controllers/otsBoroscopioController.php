<?php

namespace App\Http\Controllers;

use App\Models\activos;
use App\Models\responsable;
use App\Models\actsot;
use App\Models\otsBoroscopio;
use App\Models\otsBoroscopioImage;
use Illuminate\Http\Request;
use App\Http\Requests\otsBoroscopioRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
Use Session;

class omsBoroscopioController extends Controller
{

    public function create($taqot)
    {
        $cantReportes = count(actsot::where('taqot','LIKE',$taqot)->get());
        if($cantReportes != 0 && $cantReportes != null){
            return view('boroscopio/dataform',[
                'taqworkers' => responsable::all(),
                'taqot' => $taqot
            ]);
        }else{
            Session::flash('BoroscopioNotFound','Por favor registre una manguera a la OT.');
            return redirect()->route('ots.show',$taqot);
        }
    }


    public function AddImages($taqBoroscopio)
    {
        return view('boroscopio/Addevidencies',[
            'taqBoroscopio' => $taqBoroscopio
        ]);
    }

    public function store(otsBoroscopioRequest $request)
    {
        $cantReportes = count(actsot::where('taqot','LIKE',$request ->taqom)->get());
        $activos = actsot::where('taqot','LIKE',$request ->taqom)->get();

        if($cantReportes != 0 && $cantReportes != null){
            for($i = 0; $i < $cantReportes; $i++){
                $cantBoroscopios = count(otsBoroscopio::all())+1;
                $FechaEmision = strtotime($request->Fechaemision);
                $fechaAprobacion = strtotime($FechaEmision."+ 1 days");
                omsBoroscopio::create([
                    'taqBoroscopio'             => 'Reg-Boroscopio'.$request ->taqom.'-'.$cantBoroscopios,
                    'taqActivos'                => $activos[$i]['taqActivos'],
                    'taqot'                     => $request ->taqom,
                    'CentroCostos'              => $request -> CentroCosto,
                    'ContactoEmpresa'           => $request -> ContactoEmpresa,
                    'TelefonoEmpresa'           => $request -> TelefonoEmpresa,
                    'CorreoEmpresa'             => $request -> CorreoEmpresa,
                    'Generalidades'             => $request -> Generalidades,
                    'ReferenciaNormativa'       => $request -> Normativa,
                    'taqresponsable'            => $request -> taqresponsable,
                    'num-Doc'                   => $i+1,
                    'estado'                    => 'FaltanImages'
                ]);

            }

            Session::flash('BoroscopioUpdate','Se ha registrado la revision de boroscopio correctamente.');
            return redirect()->route('ots.show',$request ->taqom);

        }else{

            Session::flash('BoroscopioNotFound','Por favor registre una manguera a la OT.');
            return redirect()->route('ots.show',$request ->taqom);
        }

    }

    public function UploadImages(Request $request)
    {

        $taqIMGBoroscopio = count(otsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->get())+1;
        $boroscopiodata = omsBoroscopio::with('activo')->where('taqBoroscopio','LIKE',$request->taqBoroscopio)->get();
        $path = base_path().'\public\storage\urlImage\BOROSCOPIO-'.$boroscopiodata[0]['taqot'].'-'.$boroscopiodata[0]['activo']['nombre'];
        $Boroscopioevidencias = omsBoroscopioImage::create([
            'taqIMGBoroscopio'             => 'EVI'.$request->taqBoroscopio.'-'.$taqIMGBoroscopio,
            'taqBoroscopio'                => $request -> taqBoroscopio,
            'recepcionequipoDescripcion'   => $request -> recepcionequipo,
            'lavadoMangueraDescripcion'    => $request -> lavadoManguera,
            'Descripcionevidenciainterno1' => $request -> estadointernoEvidencia1,
            'Descripcionevidenciainterno2' => $request -> estadointernoEvidencia2,
            'Descripcionevidenciainterno3' => $request -> estadointernoEvidencia3,
            'Descripcionevidenciaexterno1' => $request -> estadoExterno,
            'url1recepcion' => '',
            'url2recepcion' => '',
            'url3recepcion' => '',
            'url4recepcion' => '',
            'url1lavado' => '',
            'url2lavado' => '',
            'url3lavado' => '',
            'url1interno' => '',
            'url2interno' => '',
            'url3interno' => '',
            'url1externo' => '',
            'url2externo' => '',
        ]);
        if($request -> File('registrorecepcion1')!=null){
            $foto = $request->file('registrorecepcion1');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url1recepcion' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('registrorecepcion2')!=null){
            $foto = $request->file('registrorecepcion2');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url2recepcion' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('registrorecepcion3')!=null){
            $foto = $request->file('registrorecepcion3');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url3recepcion' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('registrorecepcion4')!=null){
            $foto = $request->file('registrorecepcion4');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url4recepcion' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('lavadomanguera1')!=null){
            $foto = $request->file('lavadomanguera1');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url1lavado' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('lavadomanguera2')!=null){
            $foto = $request->file('lavadomanguera2');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url2lavado' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('lavadomanguera3')!=null){
            $foto = $request->file('lavadomanguera3');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url3lavado' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('estadointerno1')!=null){
            $foto = $request->file('estadointerno1');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url1interno' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('estadointerno2')!=null){
            $foto = $request->file('estadointerno2');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url2interno' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('estadointerno3')!=null){
            $foto = $request->file('estadointerno3');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url3interno' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('estadoexterno1')!=null){
            $foto = $request->file('estadoexterno1');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url1externo' => 'urlImage/'.$nombre,
            ]);
        }
        if($request -> File('estadoexterno2')!=null){
            $foto = $request->file('estadoexterno2');
            $nombre = $foto -> getClientOriginalName();
            Storage::disk('public')->put($nombre,\File::get($foto));
            $Boroscopioevidencias  = omsBoroscopioImage::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
                'url2externo' => 'urlImage/'.$nombre,
            ]);
        }

        $estadoReporte  = omsBoroscopio::where('taqBoroscopio','LIKE',$request->taqBoroscopio)->update([
            'estado' => 'Listo'
        ]);

        Session::flash('BoroscopioUpdate','Se ha registrado la revision de boroscopio correctamente.');
        return redirect()->route('ots.show',$boroscopiodata[0]['taqot']);
    }
}
