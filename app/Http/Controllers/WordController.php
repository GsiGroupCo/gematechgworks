<?php

namespace App\Http\Controllers;

use App\Models\ot;
use App\Models\responsable;
use App\Models\otsBoroscopio;
use App\Models\otsBoroscopioImage;
use App\Models\actsot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use PhpOffice\PhpWord\TemplateProcessor;
Use Session;

class WordController extends Controller
{

    public function BoroscoipoReportNew($taqBoroscopio) {

        $registro = omsBoroscopio::with('activo.otro')->where('taqBoroscopio','LIKE',$taqBoroscopio)->get();

        $ot = ot::with('clientes.otros')->where('taqot','LIKE',$registro[0]['taqot'])->get();

        $inspector = responsable::where('taqresponsable','LIKE',$registro[0]['taqresponsable'])->get();

        $cantReportes = count(actsot::where('taqot','LIKE',$registro[0]['taqot'])->get());

        $templateProcessor = new TemplateProcessor(base_path().'\public\docs\REPORTETECNICOBOROSCOPIO.docx');
        $templateProcessor -> setValue('TIPOSERVICIO', 'BOROSCOPIO');
        $templateProcessor -> setValue('OT',$registro[0]['taqot'].'-'.$registro[0]['num-Doc']);
        $templateProcessor -> setValue('LUGARPRUEBA', 'BASE GSI GROUP');
        $templateProcessor -> setValue('FECHA', date('d-m-Y', time()));
        $templateProcessor -> setValue(' empresa', $ot[0]['clientes']['nombre']);

        if($ot[0]['clientes']['otros'][0]['nombre'] == 'NIT'){
            $templateProcessor -> setValue('NIT', $ot[0]['clientes']['otros'][0]['value']);
        }else{
            $templateProcessor -> setValue('NIT', '');
        }
        if($ot[0]['clientes']['otros'][1]['nombre'] == 'DIRECCION'){
            $templateProcessor -> setValue('DIRECCION', $ot[0]['clientes']['otros'][1]['value']);
        }else{
            $templateProcessor -> setValue('DIRECCION', '');
        }
        /** Fechas Emision */
        $templateProcessor -> setValue('fechaaprobacion', date('d-m-Y',strtotime(date('d-m-Y', time())."- 1 days")));
        $templateProcessor -> setValue('fechaimpresion', date('d-m-Y', time()));
        $templateProcessor -> setValue('frechaemision', date('d-m-Y', time()));
        $templateProcessor -> setValue('CENTROCOSTO', $registro[0]['CentroCostos']);
        $templateProcessor -> setValue('CONTACTO', $registro[0]['ContactoEmpresa']);
        $templateProcessor -> setValue('TELEFONO', $registro[0]['TelefonoEmpresa']);
        $templateProcessor -> setValue('CORREOCONTACTO', $registro[0]['CorreoEmpresa']);
        $templateProcessor -> setValue('GENERALIDADES', $registro[0]['Generalidades']);
        $templateProcessor -> setValue('ReferenciaNormativa', $registro[0]['ReferenciaNormativa']);
        /** Informacion Equipo (MANGUERA) */
        $templateProcessor -> setValue('nombreEquipo',$registro[0]['activo']['nombre']);
        if($registro[0]['activo']['otro'][0]['nombre'] == 'DIMENSIONES'){
            $templateProcessor -> setValue('cualidades', $registro[0]['activo']['otro'][0]['value']);
        }else{
            $templateProcessor -> setValue('cualidades', '');
        }
        $templateProcessor -> setValue('serial', $registro[0]['activo']['serial']);
        if($registro[0]['activo']['otro'][1]['nombre'] == 'PRESION TRABAJO'){
            $templateProcessor -> setValue('presiontrabajo', $registro[0]['activo']['otro'][1]['value']);
        }else{
            $templateProcessor -> setValue('presiontrabajo', '');
        }
        /** Informacion Boroscopio */
        $templateProcessor -> setValue('tipoBoroscopio', 'Boroscopio');
        $templateProcessor -> setValue('serialBoroscopio', 'GSI');
        $templateProcessor -> setValue('marcaBoroscopio', 'Comstex');
        $templateProcessor -> setValue('camaraBoroscopio', 'IP 68');
        $templateProcessor -> setValue('ResolucionBoro', '800X480 RGB');
        $templateProcessor -> setValue('FormatoBorosco', 'AVI');
        /** Informacion de Inspector */
        $templateProcessor -> setValue('NombreInspector', $inspector[0]['primernombre'].' '.$inspector[0]['primerapellido']);
        $templateProcessor -> setValue('cargoInspector', $inspector[0]['cargo']);
        $templateProcessor -> setValue('tipoinspeccion', 'Remota');
        $templateProcessor -> setValue('arreainspeccion', 'Revestimiento Interno');

        $images = omsBoroscopioImage::where('taqBoroscopio','LIKE',$taqBoroscopio)->get();

        $templateProcessor -> setValue('descripcionestadoactivo', $images[0]['recepcionequipoDescripcion']);
        $templateProcessor -> setValue('descripcionlavadoactivo', $images[0]['lavadoMangueraDescripcion']);
        $templateProcessor -> setValue('estadoprueba1', $images[0]['Descripcionevidenciainterno1']);
        $templateProcessor -> setValue('estadoprueba2', $images[0]['Descripcionevidenciainterno2']);
        $templateProcessor -> setValue('estadoprueba3', $images[0]['Descripcionevidenciainterno3']);
        $templateProcessor -> setValue('estadoexterno', $images[0]['Descripcionevidenciaexterno1']);

        $templateProcessor -> setImageValue(
            'imagen1',
            [
                'path' => base_path().'/public/storage/'.$images[0]['url1recepcion'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen2',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url2recepcion'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen3',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url3recepcion'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen4',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url4recepcion'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen5',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url1lavado'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen6',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url2lavado'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen7',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url3lavado'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen8',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url1interno'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );
        $templateProcessor -> setImageValue(
            'imagen9',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url2interno'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );
        $templateProcessor -> setImageValue(
            'imagen10',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url3interno'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setImageValue(
            'imagen11',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url1externo'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );
        $templateProcessor -> setImageValue(
            'imagen12',
            [
                'path' =>  base_path().'/public/storage/'.$images[0]['url2externo'],
                'width' => 200,
                'height' => 200,
                'ratio' => false
            ]
        );

        $templateProcessor -> setValue('resultados', 'Resultados');

        $pathToSave = 'BOROSCOPIO'.$registro[0]['taqot'].'.docx';
        $templateProcessor->saveAs($pathToSave);
        return response()->download($pathToSave);
    }

    public function TestPressureReportNew($taqPressureReportNew) {

        $registro = omsBoroscopio::with('activo.otro')->where('taqBoroscopio','LIKE',$taqBoroscopio)->get();
        $ot = ot::with('clientes.otros')->where('taqot','LIKE',$registro[0]['taqot'])->get();
        $inspector = responsable::where('taqresponsable','LIKE',$registro[0]['taqresponsable'])->get();

        $templateProcessor = new TemplateProcessor(base_path().'\public\docs\REPORTETECNICOTESTPRESSURE.docx');
        $templateProcessor -> setValue('TIPOSERVICIO', 'PRUEBA HIDROSTÁTICA DE INTEGRIDAD');
        $templateProcessor -> setValue('OT',$registro[0]['taqot']);
        $templateProcessor -> setValue('FECHA', date('d-m-Y', time()));
        $templateProcessor -> setValue(' empresa', $ot[0]['clientes']['nombre']);

        if($ot[0]['clientes']['otros'][0]['nombre'] == 'NIT'){
            $templateProcessor -> setValue('NIT', $ot[0]['clientes']['otros'][0]['value']);
        }else{
            $templateProcessor -> setValue('NIT', '');
        }
        if($ot[0]['clientes']['otros'][1]['nombre'] == 'DIRECCION'){
            $templateProcessor -> setValue('DIRECCION', $ot[0]['clientes']['otros'][1]['value']);
        }else{
            $templateProcessor -> setValue('DIRECCION', '');
        }

        /** Fechas Emision */

        $templateProcessor -> setValue('CENTROCOSTO', $registro[0]['CentroCostos']);
        $templateProcessor -> setValue('CONTACTO', $registro[0]['ContactoEmpresa']);
        $templateProcessor -> setValue('TELEFONO', $registro[0]['TelefonoEmpresa']);
        $templateProcessor -> setValue('CORREOCONTACTO', $registro[0]['CorreoEmpresa']);
        $templateProcessor -> setValue('EQUIPO', $registro[0]['activo']['nombre']);
        $templateProcessor -> setValue('SERIAL', $registro[0]['activo']['serial']);

        /** Informacion Equipo (MANGUERA) */
        $templateProcessor -> setValue('PRESIONTRABAJO',$registro[0]['activo']['nombre']);
        $templateProcessor -> setValue('TEMPERATURATRABAJO',$registro[0]['activo']['nombre']);
        $templateProcessor -> setValue('BORE',$registro[0]['activo']['nombre']);
        $templateProcessor -> setValue('MFGDATE',$registro[0]['activo']['nombre']);


        $templateProcessor -> setValue('capacidadnominaldelequipo','capacidad del equipo en la prueba');
        $templateProcessor -> setValue('temperaturaambienteprueba','Ambiente');
        $templateProcessor -> setValue('CONEXION ','CONEXION');


        $templateProcessor -> setValue('Normativa','Referencianormativa');

        if($registro[0]['activo']['otro'][0]['nombre'] == 'DIMENSIONES'){
            $templateProcessor -> setValue('cualidades', $registro[0]['activo']['otro'][0]['value']);
        }else{
            $templateProcessor -> setValue('cualidades', '');
        }
        $templateProcessor -> setValue('serial', $registro[0]['activo']['serial']);
        if($registro[0]['activo']['otro'][1]['nombre'] == 'PRESION TRABAJO'){
            $templateProcessor -> setValue('presiontrabajo', $registro[0]['activo']['otro'][1]['value']);
        }else{
            $templateProcessor -> setValue('presiontrabajo', '');
        }
        /** Informacion Boroscopio */
        $templateProcessor -> setValue('tipoBoroscopio', 'Boroscopio');
        $templateProcessor -> setValue('serialBoroscopio', 'GSI');
        $templateProcessor -> setValue('marcaBoroscopio', 'Comstex');
        $templateProcessor -> setValue('camaraBoroscopio', 'IP 68');
        $templateProcessor -> setValue('ResolucionBoro', '800X480 RGB');
        $templateProcessor -> setValue('FormatoBorosco', 'AVI');
        /** Informacion de Inspector */
        $templateProcessor -> setValue('NombreInspector', $inspector[0]['primernombre'].' '.$inspector[0]['primerapellido']);
        $templateProcessor -> setValue('cargoInspector', $inspector[0]['cargo']);
        $templateProcessor -> setValue('tipoinspeccion', 'Remota');
        $templateProcessor -> setValue('arreainspeccion', 'Revestimiento Interno');
        $pathToSave = 'BOROSCOPIO'.$registro[0]['taqot'].'.docx';
        $templateProcessor->saveAs($pathToSave);
        return response()->download($pathToSave);
    }
}
