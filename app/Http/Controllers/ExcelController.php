<?php

namespace App\Http\Controllers;

use App\Models\act_corr_x_activo;
use App\Models\act_corr_x_activo_cump;
use App\Models\act_prev_x_activos;
use App\Models\act_prev_x_activos_cump;
use App\Models\ot; 
use App\Models\activos; 
use App\Models\responsable;
use App\Models\otroActivo;
use App\Models\areaot;
use App\Models\actsot;
use App\Models\actividadcorrectivaactivo;
use App\Models\manttocorrectivoactivo;
use App\Models\actividadpreventivaactivocumplido;
use App\Models\actividadcorrectivaherramienta;
use App\Models\actividadpreventivaactivo;
use App\Models\actividadcorrectivaactivocumplido;
use App\Models\actividadhoraactivo;
use App\Models\actividadpreventivaherramienta;
use App\Models\activos_x_ot;
use App\Models\areas_x_ot;
use App\Models\caracteristicas_x_activo;
use App\Models\componentes;
use App\Models\manttohorasactivo;
use App\Models\manttopreventivoactivo; 
use App\Models\manttopreventivoHerramienta;
use App\Models\manttocorrectivoHerramienta;
use App\Models\manttopreventivoHerramientaCumplido; 
use App\Models\herramienta;
use App\Models\mtto_corr_x_activos;
use App\Models\mtto_prev_x_activos;
use App\Models\Trabajo; 
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

use Illuminate\Http\Request;


class ExcelController extends Controller
{

    public function Download_ot_report($taqot)
    {
        $ot = ot::with(' empresa','Activos')->where('taqot','LIKE', $taqot)->get();
        date_default_timezone_set("America/Bogota");
        $inputFileName = base_path().'\public\docs\getot.xlsx';
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $sheet = $spreadsheet->getActiveSheet();
        // $inputFileName ='/home/gematech/public_html/docs/getot.xlsx';
        $image = base_path().'\public/img/logo-GSI2.png';
        // $image = '/home/gematech/public_html/img/logo-GSI2.png';
        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName('logo');
        $drawing->setDescription('LogoEmpresa');
        $drawing->setPath($image);
        $drawing->setHeight(75);
        $drawing->setCoordinates('B2');
        $drawing->setWorksheet($spreadsheet->getActiveSheet());
        $cantHoras  = Trabajo::where('taqot','LIKE', $taqot)->sum('cantHoras');
        $sheet->setCellValue('U8',$taqot);
        $sheet->setCellValue('S10',$ot[0]['descripcion']);
        $sheet->setCellValue('E8' ,$ot[0]['fechainicio']);
        $sheet->setCellValue('E9' ,$ot[0]['horainicio']);
        $sheet->setCellValue('E10',$ot[0]['fechafin']);
        $sheet->setCellValue('E11',$ot[0]['horafin']);
        $sheet->setCellValue('E12',$cantHoras);
        $sheet->setCellValue('T4' ,date('m-d-Y', time()));
        if($ot[0]['clasot'] == 'GSI (OIT)'){
            $sheet->setCellValue('Q8','X');
        }else if($ot[0]['clasot'] == 'GSITECH (OITT)'){
            $sheet->setCellValue('Q10','X');
        }else if($ot[0]['clasot'] == 'CLIENTES (OT)'){
            $sheet->setCellValue('Q12','X');
        }
        if($ot[0]['tipo'] == 'MTTO CORRECTIVO'){
            $sheet->setCellValue('L10','X');
        }else if($ot[0]['tipo'] == 'MTTO PREVENTIVO'){
            $sheet->setCellValue('L8','X');
        }else if($ot[0]['tipo'] == 'MTTO DISEÑO O MEJORA'){
            $sheet->setCellValue('L12','X');
        }
        $sheet->setCellValue('D17',$ot[0][' empresa']['nombre']);
        if($ot[0]['prioridad'] == 'PRIORIDAD ORDINARIA'){
            $sheet->setCellValue('R17','X');
        }else if($ot[0]['prioridad'] == 'PRIORIDAD URGENTE'){
            $sheet->setCellValue('N17','X');
        }
        $cantActivos = count(activos_x_ot::where('taqot','LIKE',$taqot)->get());
        $IdentiActivos = activos_x_ot::where('taqot','LIKE',$taqot)->get();
        $indice = 19;
        if( $cantActivos > 1 ){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($indice, $cantActivos);
        }
        foreach($IdentiActivos as $data){
            if( $cantActivos > 1 ){
                $spreadsheet->getActiveSheet()->mergeCells('B'.$indice.':'.'C'.$indice);
                $spreadsheet->getActiveSheet()->mergeCells('D'.$indice.':'.'H'.$indice);
                $spreadsheet->getActiveSheet()->mergeCells('I'.$indice.':'.'J'.$indice);
                $spreadsheet->getActiveSheet()->mergeCells('K'.$indice.':'.'M'.$indice);
                $spreadsheet->getActiveSheet()->mergeCells('N'.$indice.':'.'O'.$indice);
                $spreadsheet->getActiveSheet()->mergeCells('P'.$indice.':'.'Q'.$indice);
                $spreadsheet->getActiveSheet()->mergeCells('R'.$indice.':'.'S'.$indice);
                $spreadsheet->getActiveSheet()->mergeCells('T'.$indice.':'.'U'.$indice);
                $sheet->setCellValue('B'.$indice,'NOMBRE DEL EQUIPO');
                $sheet->setCellValue('D'.$indice,'REFERENCIA');
                $sheet->setCellValue('I'.$indice,'SERIAL');
                $sheet->setCellValue('K'.$indice,'KM/ HM');
                $spreadsheet->getActiveSheet()->getStyle('B'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('D'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('I'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('K'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('N'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('P'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('R'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('T'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
            }
            $Activos = activos::where('taqActivos','LIKE',$data -> taqActivos)->get();
            $otroActivo = caracteristicas_x_activo::where('taqActivos','LIKE',$data -> taqActivos)->get();
            $sheet->setCellValue('D'.$indice,$Activos[0]['nombre']);
            $sheet->setCellValue('P'.$indice,$Activos[0]['serial']);
            foreach($otroActivo as $DataotroActivo){
                $sheet->setCellValue('D'.$indice,$Activos[0]['nombre']);
                $sheet->setCellValue('P'.$indice,$Activos[0]['serial']);
                if($DataotroActivo -> nombre == 'REFERENCIA'){
                    $sheet->setCellValue('K'.$indice,$DataotroActivo -> value);
                }
                if($DataotroActivo -> nombre == 'KM/HM'){
                    $sheet->setCellValue('K'.$indice,$DataotroActivo -> value);
                }
            }
            $indice + 1;
        }

        $mecanica = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','MEC']])->get());
        $instrumentacion = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','INST']])->get());
        $metalmecanica = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','METALMEC']])->get());
        $electrico = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','ELECT']])->get());
        $pintur = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','PINT']])->get());
        $equipopesado = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','EPES']])->get());
        $ensayonodestructivo = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','ENNODES']])->get());
        $soldadura = count(areas_x_ot::where([['taqot','LIKE',$taqot],['taqarea','LIKE','SOLD']])->get());

        if( $cantActivos > 1 ){
            $posicionArea1 = 23 + $cantActivos;
            $posicionArea2 = 25 + $cantActivos;
        }else{
            $posicionArea1 = 23;
            $posicionArea2 = 25;
        }

        if($mecanica >= 1){
             $sheet->setCellValue('D'.$posicionArea1,'X');
        }
        if($instrumentacion >= 1){
            $sheet->setCellValue('H'.$posicionArea1,'X');
        }
        if($soldadura >= 1){
            $sheet->setCellValue('D'.$posicionArea2,'X');
        }
        if($ensayonodestructivo >= 1){
            $sheet->setCellValue('H'.$posicionArea2,'X');
        }
        if($metalmecanica >= 1){
            $sheet->setCellValue('L'.$posicionArea1,'X');
        }
        if($electrico >= 1){
            $sheet->setCellValue('O'.$posicionArea1,'X');
        }
        if($equipopesado >= 1){
            $sheet->setCellValue('L'.$posicionArea2,'X');
        }
        if($pintur >= 1){
            $sheet->setCellValue('O'.$posicionArea2,'X');
        }

        $countworks = count(Trabajo::where('taqot','LIKE', $taqot)->get());
        $trabajos   = Trabajo::with('responsables')->where('taqot','LIKE', $taqot)->get();

        if($cantActivos > 1){
            $indice = 28 + $cantActivos;
        }else{
            $indice = 28;
        }
        $item = 1;

        if($countworks > 2){
            $spreadsheet->getActiveSheet()->insertNewRowBefore(28, $countworks-2);
        }

        foreach($trabajos as $work){
            $spreadsheet->getActiveSheet()->mergeCells('C'.$indice.':'.'O'.$indice);
            $spreadsheet->getActiveSheet()->mergeCells('P'.$indice.':'.'R'.$indice);
            $spreadsheet->getActiveSheet()->mergeCells('S'.$indice.':'.'T'.$indice);

            $spreadsheet->getActiveSheet()->getStyle('C'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('P'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('S'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('U'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('B'.$indice)->getFill()->getStartColor()->setARGB('FFFFFF');

            $spreadsheet->getActiveSheet()->getStyle('C'.$indice)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
            $spreadsheet->getActiveSheet()->getStyle('P'.$indice)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
            $spreadsheet->getActiveSheet()->getStyle('S'.$indice)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
            $spreadsheet->getActiveSheet()->getStyle('U'.$indice)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
            $spreadsheet->getActiveSheet()->getStyle('B'.$indice)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
            $sheet->setCellValue('B'.$indice,$item);
            $sheet->setCellValue('C'.$indice,$work->descripcion);
            $sheet->setCellValue('P'.$indice,$work->responsables->primernombre.' '.$work->responsables->primerapellido);
            $sheet->setCellValue('U'.$indice,$work->cantHoras);
            $indice = $indice + 1;
            $item = $item + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename={$taqot}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer -> save('php://output');

    }

    public function Download_reistro_activo($taqActivos)
    {

        $motor  = caracteristicas_x_activo::where([['taqActivos','LIKE', $taqActivos],['nombre','LIKE','MOTOR']])->get();
        $marca  = caracteristicas_x_activo::where([['taqActivos','LIKE', $taqActivos],['nombre','LIKE','MARCA']])->get();
        $modelo = caracteristicas_x_activo::where([['taqActivos','LIKE', $taqActivos],['nombre','LIKE','MODELO']])->get();

        $activos = activos::where('taqActivos','LIKE', $taqActivos)->get();

        date_default_timezone_set("America/Bogota");

        // $inputFileName = base_path().'\public\docs\getactivos.xlsx';
        $inputFileName = '/home/gematech/public_html/docs/getactivos.xlsx';
 
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('F7', $activos[0]['nombre']);
        $sheet->setCellValue('P7', $activos[0]['taqActivos']);

        if($marca->isEmpty()){
            $sheet->setCellValue('A10','NO POSEE');
        }
        else{
            $sheet->setCellValue('A10',$marca[0]['value']);
        }
        if($motor->isEmpty()){
            $sheet->setCellValue('G10','NO POSEE');
        }
        else{
            $sheet->setCellValue('G10',$motor[0]['value']);
        }
        if($modelo->isEmpty()){
            $sheet->setCellValue('M10','NO POSEE');
        }else{
            $sheet->setCellValue('M10',$modelo[0]['value']);
        }

        $sheet->setCellValue('S10',$activos[0]['serial']);
        $sheet->setCellValue('H5', $activos[0]['created_at']->format('m/d/Y'));
        $sheet->setCellValue('G12',$activos[0]['descripcion']);


        $urlimage = base_path().'/public/storage/Activos/'.$activos[0]['taqActivos'].'/'.$activos[0]['urlImage'];
        // $urlimage = `/home/gematech/public_html/storage/Activos/$activos[0]['taqActivos']/$activos[0]['urlImage']`;

        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName('BOPImage');
        $drawing->setDescription('ImagenDelActivo');
        $drawing->setPath($urlimage);
        $drawing->setHeight(230);
        $drawing->setCoordinates('H13');

        $drawing->setWorksheet($spreadsheet->getActiveSheet());


        $posicioninicial = 18;

        $mttoprev = mtto_prev_x_activos::with('responsable')->where('taqActivos','LIKE',$taqActivos)->get();
        $countmttoprev = count(mtto_prev_x_activos::where('taqActivos','LIKE',$taqActivos)->get());
        for($i = 0; $i < $countmttoprev; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($posicioninicial, 1);
            $spreadsheet->getActiveSheet()->mergeCells('A'.$posicioninicial.':'.'E'.$posicioninicial);
            $spreadsheet->getActiveSheet()->mergeCells('F'.$posicioninicial.':'.'H'.$posicioninicial);
            $spreadsheet->getActiveSheet()->mergeCells('I'.$posicioninicial.':'.'O'.$posicioninicial);
            $spreadsheet->getActiveSheet()->mergeCells('P'.$posicioninicial.':'.'U'.$posicioninicial);
            $sheet->setCellValue('A'.$posicioninicial,$mttoprev[$i]['fecha']);
            $sheet->setCellValue('F'.$posicioninicial,$mttoprev[$i]['actividad']);
            $sheet->setCellValue('I'.$posicioninicial,$mttoprev[$i]['responsable']['primernombre'].'   '.$mttoprev[$i]['responsable']['primerapellido']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$posicioninicial)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('F'.$posicioninicial)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('I'.$posicioninicial)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('P'.$posicioninicial)->getFill()->getStartColor()->setARGB('FFFFFF');
            $posicioninicial = $posicioninicial + 1 ;
        }

        $posicioninicialActividades = 19 + $countmttoprev;
        $posicionatotalactividades = 0;

        if($countmttoprev != 0){
            for($i = 0; $i < $countmttoprev; $i++){
                $actividadprevetiva = act_prev_x_activos::with('responsables','mantenimiento')->where('taqmttActivo','LIKE',$mttoprev[$i]['taqmttActivo'])->get();
                $countactividadprevetiva = count(act_prev_x_activos::where('taqmttActivo','LIKE',$mttoprev[$i]['taqmttActivo'])->get());
                for($j = 0; $j < $countactividadprevetiva; $j++){
                    $spreadsheet->getActiveSheet()->insertNewRowBefore($posicioninicialActividades, 1);
                    $spreadsheet->getActiveSheet()->mergeCells('A'.$posicioninicialActividades.':'.'E'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('F'.$posicioninicialActividades.':'.'K'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('L'.$posicioninicialActividades.':'.'U'.$posicioninicialActividades);
                    $sheet->setCellValue('A'.$posicioninicialActividades,$actividadprevetiva[$j]['frecuencia'].' Dias');
                    $sheet->setCellValue('F'.$posicioninicialActividades,$actividadprevetiva[$j]['nombre']);
                    $sheet->setCellValue('L'.$posicioninicialActividades,$actividadprevetiva[$j]['mantenimiento']['actividad']);
                    $spreadsheet->getActiveSheet()->getStyle('A'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('F'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('L'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');

                }
                $posicionatotalactividades = $posicionatotalactividades + $countactividadprevetiva;
            }

            $posicioninicialActividades = 22 + $posicionatotalactividades + $countmttoprev ;
            $posicionatotalactividadescumplidas = 0;

            for($i = 0; $i < $countmttoprev; $i++){
                $actividadprevetivaCumplida = act_prev_x_activos_cump::with('responsables','mantenimientoPreventivo')->where('taqmttActivo','LIKE',$mttoprev[$i]['taqmttActivo'])->get();
                $countactividadprevetivaCumplida = count(act_prev_x_activos_cump::where('taqmttActivo','LIKE',$mttoprev[$i]['taqmttActivo'])->get());
                for($j = 0; $j < $countactividadprevetivaCumplida; $j++){
                    $spreadsheet->getActiveSheet()->insertNewRowBefore($posicioninicialActividades, 1);
                    $spreadsheet->getActiveSheet()->mergeCells('A'.$posicioninicialActividades.':'.'E'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('F'.$posicioninicialActividades.':'.'H'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('I'.$posicioninicialActividades.':'.'O'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('P'.$posicioninicialActividades.':'.'U'.$posicioninicialActividades);
                    $sheet->setCellValue('A'.$posicioninicialActividades,$actividadprevetivaCumplida[$j]['fecha']);
                    $sheet->setCellValue('F'.$posicioninicialActividades,$actividadprevetivaCumplida[$j]['nombre']);
                    $sheet->setCellValue('I'.$posicioninicialActividades,$actividadprevetivaCumplida[$j]['responsables']['primernombre'].'  '.$actividadprevetivaCumplida[$j]['responsables']['primerapellido']);
                    $sheet->setCellValue('P'.$posicioninicialActividades,$actividadprevetivaCumplida[$j]['mantenimientoPreventivo']['actividad']);
                    $spreadsheet->getActiveSheet()->getStyle('A'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('F'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('I'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('P'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');

                }
                $posicionatotalactividadescumplidas = $posicionatotalactividadescumplidas + $countactividadprevetivaCumplida;
            }

            $posicioninicialMttoCorr = 24 + $posicionatotalactividadescumplidas + $posicionatotalactividades + $countmttoprev;
        }

        $mttoCorr = mtto_corr_x_activos::with('responsable')->where('taqActivos','LIKE',$taqActivos)->get();
        $countmttoCorr = count(mtto_corr_x_activos::where('taqActivos','LIKE',$taqActivos)->get());
        for($i = 0; $i < $countmttoCorr; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($posicioninicialMttoCorr, 1);
            $spreadsheet->getActiveSheet()->mergeCells('A'.$posicioninicialMttoCorr.':'.'E'.$posicioninicialMttoCorr);
            $spreadsheet->getActiveSheet()->mergeCells('F'.$posicioninicialMttoCorr.':'.'H'.$posicioninicialMttoCorr);
            $spreadsheet->getActiveSheet()->mergeCells('I'.$posicioninicialMttoCorr.':'.'O'.$posicioninicialMttoCorr);
            $spreadsheet->getActiveSheet()->mergeCells('P'.$posicioninicialMttoCorr.':'.'R'.$posicioninicialMttoCorr);
            $spreadsheet->getActiveSheet()->mergeCells('S'.$posicioninicialMttoCorr.':'.'U'.$posicioninicialMttoCorr);
            $sheet->setCellValue('A'.$posicioninicialMttoCorr,$mttoCorr[$i]['fecha']);
            $sheet->setCellValue('F'.$posicioninicialMttoCorr,$mttoCorr[$i]['actividad']);
            $sheet->setCellValue('I'.$posicioninicialMttoCorr,$mttoCorr[$i]['responsable']['primernombre'].'   '.$mttoCorr[$i]['responsable']['primerapellido']);
            $sheet->setCellValue('P'.$posicioninicialMttoCorr,$mttoCorr[$i]['preoperacional']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$posicioninicialMttoCorr)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('F'.$posicioninicialMttoCorr)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('I'.$posicioninicialMttoCorr)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('P'.$posicioninicialMttoCorr)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('S'.$posicioninicialMttoCorr)->getFill()->getStartColor()->setARGB('FFFFFF');
            $posicioninicialMttoCorr = $posicioninicialMttoCorr + 1 ;
        }

        if($countmttoCorr!=0){
            $posicioninicialActividades = 26 + $countmttoCorr  + $posicionatotalactividades + $countmttoprev + $posicionatotalactividadescumplidas;
            $cantidadactividadescorrectivas = 0;
            for($i = 0; $i < $countmttoCorr; $i++){
                $actividadcorrectiva = act_corr_x_activo::with('responsables','mantenimientoCorrectivos')->where([['taqmttActivo','LIKE',$mttoCorr[$i]['taqmttActivo']],['estado','LIKE','TERMINADO']])->get();
                $countactividadcorrectiva = count(act_corr_x_activo::where([['taqmttActivo','LIKE',$mttoCorr[$i]['taqmttActivo']],['estado','LIKE','TERMINADO']])->get());
                for($j = 0; $j < $countactividadcorrectiva; $j++){
                    $spreadsheet->getActiveSheet()->insertNewRowBefore($posicioninicialActividades, 1);
                    $spreadsheet->getActiveSheet()->mergeCells('A'.$posicioninicialActividades.':'.'E'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('F'.$posicioninicialActividades.':'.'H'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('I'.$posicioninicialActividades.':'.'O'.$posicioninicialActividades);
                    $spreadsheet->getActiveSheet()->mergeCells('P'.$posicioninicialActividades.':'.'U'.$posicioninicialActividades);
                    $sheet->setCellValue('A'.$posicioninicialActividades,$actividadcorrectiva[$j]['fecha']);
                    $sheet->setCellValue('F'.$posicioninicialActividades,$actividadcorrectiva[$j]['nombre']);
                    $sheet->setCellValue('I'.$posicioninicialActividades,$actividadcorrectiva[$j]['responsables']['primernombre'].'   '.$actividadcorrectiva[$i]['responsables']['primerapellido']);
                    $sheet->setCellValue('P'.$posicioninicialActividades,$actividadcorrectiva[$j]['mantenimientoCorrectivos']['actividad']);
                    $spreadsheet->getActiveSheet()->getStyle('A'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('F'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('I'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('P'.$posicioninicialActividades)->getFill()->getStartColor()->setARGB('FFFFFF');
                }
                $cantidadactividadescorrectivas = $cantidadactividadescorrectivas + $countactividadcorrectiva;
            }
            $posicioninicialActividadescorrectivascumplidas = 28 + $countmttoCorr + $posicionatotalactividades + $countmttoprev + $posicionatotalactividadescumplidas + $cantidadactividadescorrectivas ;

            for($i = 0; $i < $countmttoprev; $i++){
                $actividadprevetivaCumplida = act_corr_x_activo_cump::with('responsables','mantenimientoCorrectivos')->where('taqmttActivo','LIKE',$mttoCorr[$i]['taqmttActivo'])->get();
                $countactividadprevetivaCumplida = count(act_corr_x_activo_cump::where('taqmttActivo','LIKE',$mttoCorr[$i]['taqmttActivo'])->get());

                for($j = 0; $j < $countactividadprevetivaCumplida; $j++){
                    $spreadsheet->getActiveSheet()->insertNewRowBefore($posicioninicialActividadescorrectivascumplidas, 1);
                    $spreadsheet->getActiveSheet()->mergeCells('A'.$posicioninicialActividadescorrectivascumplidas.':'.'E'.$posicioninicialActividadescorrectivascumplidas);
                    $spreadsheet->getActiveSheet()->mergeCells('F'.$posicioninicialActividadescorrectivascumplidas.':'.'H'.$posicioninicialActividadescorrectivascumplidas);
                    $spreadsheet->getActiveSheet()->mergeCells('I'.$posicioninicialActividadescorrectivascumplidas.':'.'O'.$posicioninicialActividadescorrectivascumplidas);
                    $spreadsheet->getActiveSheet()->mergeCells('P'.$posicioninicialActividadescorrectivascumplidas.':'.'U'.$posicioninicialActividadescorrectivascumplidas);
                    $sheet->setCellValue('A'.$posicioninicialActividadescorrectivascumplidas,$actividadprevetivaCumplida[$j]['fecha']);
                    $sheet->setCellValue('F'.$posicioninicialActividadescorrectivascumplidas,$actividadprevetivaCumplida[$j]['nombre']);
                    $sheet->setCellValue('I'.$posicioninicialActividadescorrectivascumplidas,$actividadprevetivaCumplida[$j]['responsables']['primernombre'].'  '.$actividadprevetivaCumplida[$j]['responsables']['primerapellido']);
                    $sheet->setCellValue('P'.$posicioninicialActividadescorrectivascumplidas,$actividadprevetivaCumplida[$j]['mantenimientoCorrectivos']['actividad']);
                    $spreadsheet->getActiveSheet()->getStyle('A'.$posicioninicialActividadescorrectivascumplidas)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('F'.$posicioninicialActividadescorrectivascumplidas)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('I'.$posicioninicialActividadescorrectivascumplidas)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('P'.$posicioninicialActividadescorrectivascumplidas)->getFill()->getStartColor()->setARGB('FFFFFF');
                }
            }
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=ACTIVO-{$taqActivos}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');

    }

    public function getHer($taqHer)
    {

        $herramienta = herramienta::where('taqHer','LIKE', $taqHer)->get();

        date_default_timezone_set("America/Bogota");

        //$inputFileName = base_path().'\public\docs\getactivos.xlsx';
        $inputFileName = '/home/gematech/public_html/docs/getactivos.xlsx';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('F7', $herramienta[0]['nombre']);
        $sheet->setCellValue('P7', $herramienta[0]['taqHer']);
        $sheet->setCellValue('A10',$herramienta[0]['marca']);
        $sheet->setCellValue('G10',$herramienta[0]['motor']);
        $sheet->setCellValue('M10',$herramienta[0]['modelo']);
        $sheet->setCellValue('S10',$herramienta[0]['serial']);
        $sheet->setCellValue('H5', $herramienta[0]['created_at']->format('m/d/Y'));
        $sheet->setCellValue('G12',$herramienta[0]['descripcion']);


        //$urlimage = base_path().'/public/storage/'.$herramienta[0]['urlImage'];
        $urlimage = '/home/gematech/public_html/storage/'.$herramienta[0]['urlImage'];

        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName('HerramientaImage');
        $drawing->setDescription('ImagenDeLaHerramienta');
        $drawing->setPath($urlimage);
        $drawing->setHeight(230);
        $drawing->setCoordinates('H13');

        $drawing->setWorksheet($spreadsheet->getActiveSheet());

        $countMttos = count(manttopreventivoHerramienta::where('taqHer','LIKE',$taqHer)->get());
        $rutinas = manttopreventivoHerramienta::with('subrutina')->where('taqHer','LIKE',$taqHer)->get();

        $banderaPosicion = 18;
        for($i = 0; $i < $countMttos; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($banderaPosicion, 1);
            $spreadsheet->getActiveSheet()->mergeCells('A'.$banderaPosicion.':'.'L'.$banderaPosicion);
            $spreadsheet->getActiveSheet()->mergeCells('M'.$banderaPosicion.':'.'R'.$banderaPosicion);
            $spreadsheet->getActiveSheet()->mergeCells('S'.$banderaPosicion.':'.'U'.$banderaPosicion);
            $sheet->setCellValue('A'.$banderaPosicion, $rutinas[$i]['subrutina'][0]['nombre']);
            $sheet->setCellValue('M'.$banderaPosicion, $rutinas[$i]['subrutina'][0]['frecuencia']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$banderaPosicion)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('M'.$banderaPosicion)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('S'.$banderaPosicion)->getFill()->getStartColor()->setARGB('FFFFFF');
            $banderaPosicion = $banderaPosicion + 1;
        }

        $CumplidosCount = count(manttopreventivoHerramientaCumplido::where('taqHer','LIKE', $taqHer)->get());
        $Cumplidos = manttopreventivoHerramientaCumplido::with('manttoHerramienta.subrutina')->where('taqHer','LIKE', $taqHer)->get();

        $banderaPosicionII = 20 + $countMttos ;

        for($i = 0; $i < $CumplidosCount; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($banderaPosicionII, 1);
            $spreadsheet->getActiveSheet()->mergeCells('A'.$banderaPosicionII.':'.'D'.$banderaPosicionII);
            $spreadsheet->getActiveSheet()->mergeCells('E'.$banderaPosicionII.':'.'O'.$banderaPosicionII);
            $spreadsheet->getActiveSheet()->mergeCells('P'.$banderaPosicionII.':'.'S'.$banderaPosicionII);
            $spreadsheet->getActiveSheet()->mergeCells('T'.$banderaPosicionII.':'.'U'.$banderaPosicionII);
            $sheet->setCellValue('A'.$banderaPosicionII, $Cumplidos[$i]['created_at']->format('m/d/Y'));
            $sheet->setCellValue('E'.$banderaPosicionII, $Cumplidos[$i]['manttoHerramienta']['subrutina'][0]['nombre']);
            $responsable = responsable::where('taqresponsable','LIKE',$Cumplidos[$i]['taqresponsable'])->get();
            $sheet->setCellValue('P'.$banderaPosicionII, $responsable[0]['primernombre'].' '.$responsable[0]['primerapellido']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$banderaPosicionII)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('E'.$banderaPosicionII)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('P'.$banderaPosicionII)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('T'.$banderaPosicionII)->getFill()->getStartColor()->setARGB('FFFFFF');
            $banderaPosicionII = $banderaPosicionII + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=HERRAMIENTA-{$taqHer}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');


    }

    public function Download_ficha_tecnica($taqActivos){


        $activos =  activos::where('taqActivos','LIKE', $taqActivos)->get();

        date_default_timezone_set("America/Bogota");

        // $inputFileName = base_path().'\public\docs\FICHATECNICA.xlsx';
        $inputFileName = '/home/gematech/public_html/docs/FICHATECNICA.xlsx';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('H7', $activos[0]['nombre']);
        $sheet->setCellValue('H8', $activos[0]['taqActivos']);
        $sheet->setCellValue('H8',$activos[0]['serial']);

        //$urlimage = base_path().'/public/storage/'.$activos[0]['urlImage'];
        // $urlimage = '/home/gematech/public_html/storage/'.$activos[0]['urlImage'];
        $urlimage = base_path().'/public/storage/Activos/'.$activos[0]['taqActivos'].'/'.$activos[0]['urlImage'];

        $others =  count(caracteristicas_x_activo::where('taqActivos','LIKE', $taqActivos)->get());

        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName('BOPImage');
        $drawing->setDescription('ImagenDelActivo');
        $drawing->setPath($urlimage);

        $drawing->setHeight(440);
        $photoposition = 10 + $others;
        $drawing->setCoordinates('D'.$photoposition);

        $other = caracteristicas_x_activo::where('taqActivos','LIKE',$taqActivos)->get();

        $indice = 9 ;
        for($i = 0; $i < $others; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($indice, 1);
            $spreadsheet->getActiveSheet()->mergeCells('B'.$indice.':'.'G'.$indice);
            $spreadsheet->getActiveSheet()->mergeCells('H'.$indice.':'.'M'.$indice);
            $sheet->setCellValue('B'.$indice,$other[$i]['nombre']);
            $sheet->setCellValue('H'.$indice,$other[$i]['value']);
            $indice = $indice + 1;
        }


        $descriptionLocation = 34 + $others;
        $spreadsheet->getActiveSheet()->getStyle('B'.$descriptionLocation)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
        $sheet->setCellValue('B'.$descriptionLocation,$activos[0]['descripcion']);


        $drawing->setWorksheet($spreadsheet->getActiveSheet());
        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=OT{$taqActivos}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');


    }


    public function formatoMantenimientoXHorasActivo($taqmttActivo){
        $mantenimiento =  mtto_prev_x_activos::with('responsable','Activos')->where('taqmttActivo','LIKE', $taqmttActivo)->get();
        $cantDocs = $mantenimiento[0]['cantDocs'];
        $cantActividades = count(act_prev_x_activos::where([['taqmttActivo','LIKE',$taqmttActivo],['estado','LIKE','ASIGNADO']])->get());
        $Actividades = act_prev_x_activos::with('responsables')->where([['taqmttActivo','LIKE',$taqmttActivo],['estado','LIKE','ASIGNADO']])->get();
        if($cantDocs == 0){
            $cantDocs = 1;
        }
        if( date('Y',strtotime($mantenimiento[0]['updated_at'])) == date('Y',time())){
            if($cantDocs <= 9){
                $cantOMS = '000'.$cantDocs;
            }elseif($cantDocs <= 99){
                $cantOMS = '00'.$cantDocs;
            }elseif($cantDocs <= 999){
                $cantOMS = '0'.$cantDocs;
            }elseif($cantDocs <= 9999){
                $cantOMS = $cantDocs;
            }
        }elseif(date('Y',$mantenimiento[0]['created_at']) > date('y',time())){
            mtto_prev_x_activos::where('taqmttActivo','LIKE', $taqmttActivo)-> update([
                'cantDocs'       => 0,
            ]);
        }

        $consecutivo = 'OM-'.$cantOMS.'-'.date('y',time());
        $activo = activos::where('taqActivos','LIKE',$mantenimiento[0]['taqActivos'])->get();

        date_default_timezone_set("America/Bogota");

        $inputFileName = base_path().'\public\docs\FichaMtto.xlsx';
        //$inputFileName = '/home/gematech/public_html/docs/FichaMtto.xls';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('E9', 'MTTO POR HORAS');
        $sheet->setCellValue('J9', date("d-m-Y",time()));
        $sheet->setCellValue('N9',$consecutivo);
        $sheet->setCellValue('J11',$mantenimiento[0]['area']);
        $sheet->setCellValue('E11',$mantenimiento[0]['responsable']['primernombre'].' '.$mantenimiento[0]['responsable']['primerapellido']);
        $sheet->setCellValue('E13',$mantenimiento[0]['Activos']['nombre']);
        $sheet->setCellValue('J13',$mantenimiento[0]['Activos']['taqActivos']);
        $sheet->setCellValue('B16',$mantenimiento[0]['actividad']);
        $sheet->setCellValue('M13',$mantenimiento[0]['Activos']['serial']);

        $bandera = 21;

        for($i = 0; $i < $cantActividades; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $spreadsheet->getActiveSheet()->mergeCells('B'.$bandera.':'.'E'.$bandera);
            $spreadsheet->getActiveSheet()->mergeCells('F'.$bandera.':'.'I'.$bandera);
            $spreadsheet->getActiveSheet()->mergeCells('L'.$bandera.':'.'N'.$bandera);
            $sheet->setCellValue('B'.$bandera,$Actividades[$i]['responsables']['primernombre'].' '.$Actividades[$i]['responsables']['primerapellido']);
            $sheet->setCellValue('F'.$bandera,$Actividades[$i]['nombre']);
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('F'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('L'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('J'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('K'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=MTTOPREV-{$taqmttActivo}.xlsx");
        header('Cache-Control: max-age=0');

        mtto_prev_x_activos::where('taqmttActivo','LIKE', $taqmttActivo)-> update([
            'cantDocs' => $cantDocs + 1,
        ]);

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');


    }

    public function formatoMantenimientoPreventivoActivo($taqmttActivo){
        $mantenimiento =  mtto_prev_x_activos::with('responsable','Activos')->where('taqmttActivo','LIKE', $taqmttActivo)->get();
        $cantDocs = $mantenimiento[0]['cantDocs'];
        $cantActividades = count(act_prev_x_activos::where([['taqmttActivo','LIKE',$taqmttActivo],['estado','LIKE','ASIGNADO']])->get());
        $Actividades = act_prev_x_activos::with('responsables')->where([['taqmttActivo','LIKE',$taqmttActivo],['estado','LIKE','ASIGNADO']])->get();
        if($cantDocs == 0){
            $cantDocs = 1;
        }
        if( date('Y',strtotime($mantenimiento[0]['updated_at'])) == date('Y',time())){
            if($cantDocs <= 9){
                $cantOMS = '000'.$cantDocs;
            }elseif($cantDocs <= 99){
                $cantOMS = '00'.$cantDocs;
            }elseif($cantDocs <= 999){
                $cantOMS = '0'.$cantDocs;
            }elseif($cantDocs <= 9999){
                $cantOMS = $cantDocs;
            }
        }elseif(date('Y',$mantenimiento[0]['created_at']) > date('y',time())){
            mtto_prev_x_activos::where('taqmttActivo','LIKE', $taqmttActivo)-> update([
                'cantDocs'       => 0,
            ]);
        }

        $consecutivo = $cantOMS.'-'.date('y',time());
        $activo = activos::where('taqActivos','LIKE',$mantenimiento[0]['taqActivos'])->get();

        date_default_timezone_set("America/Bogota");

        $inputFileName = base_path().'\public\docs\FichaMtto.xlsx';
        //$inputFileName = '/home/gematech/public_html/docs/FichaMtto.xls';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('E9', 'PREVENTIVO');
        $sheet->setCellValue('J9', date("d-m-Y",time()));
        $sheet->setCellValue('N9',$consecutivo);
        $sheet->setCellValue('J11',$mantenimiento[0]['area']);
        $sheet->setCellValue('E11',$mantenimiento[0]['responsable']['primernombre'].' '.$mantenimiento[0]['responsable']['primerapellido']);
        $sheet->setCellValue('E13',$mantenimiento[0]['Activos']['nombre']);
        $sheet->setCellValue('J13',$mantenimiento[0]['Activos']['taqActivos']);
        $sheet->setCellValue('B16',$mantenimiento[0]['actividad']);
        $sheet->setCellValue('M13',$mantenimiento[0]['Activos']['serial']);

        $bandera = 21;

        for($i = 0; $i < $cantActividades; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $spreadsheet->getActiveSheet()->mergeCells('B'.$bandera.':'.'C'.$bandera);
            $spreadsheet->getActiveSheet()->mergeCells('D'.$bandera.':'.'J'.$bandera);
            $spreadsheet->getActiveSheet()->mergeCells('M'.$bandera.':'.'N'.$bandera);
            $sheet->setCellValue('B'.$bandera,$Actividades[$i]['responsables']['primernombre'].' '.$Actividades[$i]['responsables']['primerapellido']);
            $sheet->setCellValue('D'.$bandera,$Actividades[$i]['nombre']);
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('D'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('K'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('L'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('M'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=MTTOPREV-{$taqmttActivo}.xlsx");
        header('Cache-Control: max-age=0');

        mtto_prev_x_activos::where('taqmttActivo','LIKE', $taqmttActivo)-> update([
            'cantDocs' => $cantDocs + 1,
        ]);

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');


    }

    public function formatoMantenimientoCorrectivoActivo($taqmttActivo){

        $mantenimiento =  manttocorrectivoactivo::with('responsable','Activos')->where('taqmttActivo','LIKE', $taqmttActivo)->get();

        $cantDocs = $mantenimiento[0]['cantDocs'];
        $cantActividades = count(actividadcorrectivaactivo::where([['taqmttActivo','LIKE',$taqmttActivo],['estado','LIKE','ASIGNADO']])->get());
        $Actividades = actividadcorrectivaactivo::with('responsables')->where([['taqmttActivo','LIKE',$taqmttActivo],['estado','LIKE','ASIGNADO']])->get();

        if($cantDocs == 0){
            $cantDocs = 1;
        }
        if( date('Y',strtotime($mantenimiento[0]['updated_at'])) == date('Y',time())){
            if($cantDocs <= 9){
                $cantOMS = '000'.$cantDocs;
            }elseif($cantDocs <= 99){
                $cantOMS = '00'.$cantDocs;
            }elseif($cantDocs <= 999){
                $cantOMS = '0'.$cantDocs;
            }elseif($cantDocs <= 9999){
                $cantOMS = $cantDocs;
            }
        }elseif(date('Y',$mantenimiento[0]['created_at']) > date('y',time())){
            manttopreventivoactivo::where('taqmttActivo','LIKE', $taqmttActivo)-> update([
                'cantDocs'       => 0,
            ]);
        }

        $consecutivo = 'OM-'.$cantOMS.'-'.date('y',time());
        $activo = activos::where('taqActivos','LIKE',$mantenimiento[0]['taqActivos'])->get();

        date_default_timezone_set("America/Bogota");

        $inputFileName = base_path().'\public\docs\FichaMttoCorr.xlsx';
        //$inputFileName = base_path().'/home/gematech/public_html/docs/FichaMttoCorr.xls';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('E9', 'CORRECTIVO');
        $sheet->setCellValue('J9', date("d-m-Y",time()));
        $sheet->setCellValue('N9',$consecutivo);
        $sheet->setCellValue('J11',$mantenimiento[0]['area']);
        $sheet->setCellValue('N11',$mantenimiento[0]['preoperacional']);
        $sheet->setCellValue('E11',$mantenimiento[0]['responsable']['primernombre'].' '.$mantenimiento[0]['responsable']['primerapellido']);
        $sheet->setCellValue('E13',$mantenimiento[0]['Activos']['nombre']);
        $sheet->setCellValue('J13',$mantenimiento[0]['Activos']['taqActivos']);
        $sheet->setCellValue('B16',$mantenimiento[0]['actividad']);
        $sheet->setCellValue('M13',$mantenimiento[0]['Activos']['serial']);

        $bandera = 21;

        for($i = 0; $i < $cantActividades; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $spreadsheet->getActiveSheet()->mergeCells('B'.$bandera.':'.'L'.$bandera);
            $sheet->setCellValue('B'.$bandera,$Actividades[$i]['nombre']);
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('M'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('N'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=MTTOPREV-{$taqmttActivo}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');


    }
    
    public function formatoMantenimientoPreventivoHerramienta($taqmttHerramienta){

        $mantenimiento =  manttopreventivoHerramienta::with('responsable','Herramienta')->where('taqmttHerramienta','LIKE', $taqmttHerramienta)->get();
        $cantDocs = $mantenimiento[0]['cantDocs'];
        $cantActividades = count(actividadpreventivaherramienta::where([['taqmttHerramienta','LIKE',$taqmttHerramienta],['estado','LIKE','ASIGNADO']])->get());
        $Actividades = actividadpreventivaherramienta::with('responsables')->where([['taqmttHerramienta','LIKE',$taqmttHerramienta],['estado','LIKE','ASIGNADO']])->get();
        if($cantDocs == 0){
            $cantDocs = 1;
        }
        if( date('Y',strtotime($mantenimiento[0]['updated_at'])) == date('Y',time())){
            if($cantDocs <= 9){
                $cantOMS = '000'.$cantDocs;
            }elseif($cantDocs <= 99){
                $cantOMS = '00'.$cantDocs;
            }elseif($cantDocs <= 999){
                $cantOMS = '0'.$cantDocs;
            }elseif($cantDocs <= 9999){
                $cantOMS = $cantDocs;
            }
        }elseif(date('Y',$mantenimiento[0]['created_at']) > date('y',time())){
            manttopreventivoactivo::where('taqmttActivo','LIKE', $taqmttActivo)-> update([
                'cantDocs'       => 0,
            ]);
        }

        $consecutivo = 'OM-'.$cantOMS.'-'.date('y',time());

        date_default_timezone_set("America/Bogota");

        $inputFileName = base_path().'\public\docs\FichaMtto.xlsx';
        //$inputFileName = base_path().'/home/gematech/public_html/docs/FichaMtto.xls';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('E9', 'PREVENTIVO');
        $sheet->setCellValue('J9', date("d-m-Y",time()));
        $sheet->setCellValue('N9',$consecutivo);
        $sheet->setCellValue('J11',$mantenimiento[0]['area']);
        $sheet->setCellValue('E11',$mantenimiento[0]['responsable']['primernombre'].' '.$mantenimiento[0]['responsable']['primerapellido']);
        $sheet->setCellValue('E13',$mantenimiento[0]['Herramienta']['nombre']);
        $sheet->setCellValue('J13',$mantenimiento[0]['Herramienta']['taqHer']);
        $sheet->setCellValue('B16',$mantenimiento[0]['actividad']);
        $sheet->setCellValue('M13',$mantenimiento[0]['Herramienta']['serial']);

        $bandera = 21;

        for($i = 0; $i < $cantActividades; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $spreadsheet->getActiveSheet()->mergeCells('B'.$bandera.':'.'C'.$bandera);
            $spreadsheet->getActiveSheet()->mergeCells('D'.$bandera.':'.'J'.$bandera);
            $spreadsheet->getActiveSheet()->mergeCells('M'.$bandera.':'.'N'.$bandera);
            $sheet->setCellValue('B'.$bandera,$Actividades[$i]['responsables']['primernombre'].' '.$Actividades[$i]['responsables']['primerapellido']);
            $sheet->setCellValue('D'.$bandera,$Actividades[$i]['nombre']);
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('D'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('K'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('L'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('M'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=MTTOPREV-{$taqmttHerramienta}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');
    }

    public function formatoMantenimientoCorrectivoHerramienta($taqmttHerramienta){

        $mantenimiento =  manttocorrectivoHerramienta::with('responsable','Herramienta')->where('taqmttHerramienta','LIKE', $taqmttHerramienta)->get();
        $cantDocs = $mantenimiento[0]['cantDocs'] + 1;
        $cantActividades = count(actividadcorrectivaherramienta::where([['taqmttHerramienta','LIKE',$taqmttHerramienta],['estado','LIKE','ASIGNADO']])->get());
        $Actividades = actividadcorrectivaherramienta::with('responsables')->where([['taqmttHerramienta','LIKE',$taqmttHerramienta],['estado','LIKE','ASIGNADO']])->get();
        if($cantDocs == 0){
            $cantDocs = 1;
        }
        if( date('Y',strtotime($mantenimiento[0]['updated_at'])) == date('Y',time())){
            if($cantDocs <= 9){
                $cantOMS = '000'.$cantDocs;
            }elseif($cantDocs <= 99){
                $cantOMS = '00'.$cantDocs;
            }elseif($cantDocs <= 999){
                $cantOMS = '0'.$cantDocs;
            }elseif($cantDocs <= 9999){
                $cantOMS = $cantDocs;
            }
        }elseif(date('Y',$mantenimiento[0]['created_at']) > date('y',time())){
            manttopreventivoactivo::where('taqmttActivo','LIKE', $taqmttActivo)-> update([
                'cantDocs'       => 0,
            ]);
        }

        $consecutivo = 'OM-'.$cantOMS.'-'.date('y',time());

        date_default_timezone_set("America/Bogota");


        $inputFileName = base_path().'\public\docs\FichaMttoCorr.xlsx';
        //$inputFileName = base_path().'/home/gematech/public_html/docs/FichaMttoCorr.xls';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('E9', 'CORRECTIVO');
        $sheet->setCellValue('J9', date("d-m-Y",time()));
        $sheet->setCellValue('N9',$consecutivo);
        $sheet->setCellValue('N11',$mantenimiento[0]['preoperacional']);
        $sheet->setCellValue('J11',$mantenimiento[0]['area']);
        $sheet->setCellValue('E11',$mantenimiento[0]['responsable']['primernombre'].' '.$mantenimiento[0]['responsable']['primerapellido']);
        $sheet->setCellValue('E13',$mantenimiento[0]['Herramienta']['nombre']);
        $sheet->setCellValue('J13',$mantenimiento[0]['Herramienta']['taqHer']);
        $sheet->setCellValue('B16',$mantenimiento[0]['actividad']);
        $sheet->setCellValue('M13',$mantenimiento[0]['Herramienta']['serial']);

        $bandera = 21;

        for($i = 0; $i < $cantActividades; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $spreadsheet->getActiveSheet()->mergeCells('B'.$bandera.':'.'L'.$bandera);
            $sheet->setCellValue('B'.$bandera,$Actividades[$i]['nombre']);
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('M'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('N'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=MTTOPREV-{$taqmttHerramienta}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');

    }

    public function ListOts(){

        date_default_timezone_set("America/Bogota");


        //$inputFileName = base_path().'\public\docs\ListaOTS.xlsx';
        $inputFileName = '/home/gematech/public_html/docs/ListaOTS.xlsx';

        $CantOts = count(ot::all());
        $Ots = ot::all();

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);

        $sheet = $spreadsheet->getActiveSheet();

        $bandera = 2;

        for($i = 0; $i < $CantOts; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $sheet->setCellValue('A'.$bandera,$Ots[$i]['taqot']);
            $sheet->setCellValue('B'.$bandera,$Ots[$i]['descripcion']);
            $sheet->setCellValue('C'.$bandera,$Ots[$i]['estado']);
            $sheet->setCellValue('D'.$bandera,$Ots[$i]['created_at']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('C'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('D'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }

        $writer = new Xlsx($spreadsheet);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=OTLIST.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');

    }

    public function ListActivos(Request $request){

        date_default_timezone_set("America/Bogota");

        $inputFileName = base_path().'/public/docs/ListaOTS.xlsx';
        $CantActivos = count(activos::all());
        $Actviso = activos::all();
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $sheet = $spreadsheet->getActiveSheet();
        $bandera = 2;
        for($i = 0; $i < $CantActivos; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $sheet->setCellValue('A'.$bandera,$Actviso[$i]['taqActivos']);
            $sheet->setCellValue('B'.$bandera,$Actviso[$i]['nombre']);
            $sheet->setCellValue('C'.$bandera,$Actviso[$i]['descripcion']);
            $sheet->setCellValue('D'.$bandera,$Actviso[$i]['serial']);
            $sheet->setCellValue('E'.$bandera,$Actviso[$i]['dependencia']);
            $sheet->setCellValue('F'.$bandera,$Actviso[$i]['horasuso']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('C'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('D'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('E'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('F'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }
        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=Listado_de_Activos.xlsx");
        header('Cache-Control: max-age=0');
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer -> save('php://output'); 

    }

    public function ListComponentes(){
        date_default_timezone_set("America/Bogota");
        $inputFileName   = base_path().'\public\docs\ListaComponentes.xlsx';
        $CantComponentes = count(componentes::all());
        $Componentes     = componentes::with('Categoria','Empresa')->get();
        $spreadsheet     = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $sheet           = $spreadsheet->getActiveSheet();
        $bandera = 2; 
        for($i = 0; $i < $CantComponentes; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $sheet->setCellValue('A'.$bandera,$Componentes[$i]['taqComponente']);
            $sheet->setCellValue('B'.$bandera,$Componentes[$i]['nombre']);
            $sheet->setCellValue('C'.$bandera,$Componentes[$i]['descripcion']);
            $sheet->setCellValue('D'.$bandera,$Componentes[$i]['serial']);
            $sheet->setCellValue('E'.$bandera,$Componentes[$i]['horasuso']);
            $sheet->setCellValue('F'.$bandera,$Componentes[$i]['Empresa']['nombre']);
            $sheet->setCellValue('G'.$bandera,$Componentes[$i]['Categoria']['nombre']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('C'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('D'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('E'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('F'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }
        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=Litado_de_Componentes.xlsx");
        header('Cache-Control: max-age=0');
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer -> save('php://output'); 

    }

    public function ListHerramientas(){
        date_default_timezone_set("America/Bogota");
        $inputFileName = base_path().'\public\docs\ListaHerramientas.xlsx';
        $CanHerramientas = count(herramienta::all());
        $Herramientas = herramienta::all();
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $sheet = $spreadsheet->getActiveSheet();
        $bandera = 2;
        for($i = 0; $i < $CanHerramientas; $i++){
            $spreadsheet->getActiveSheet()->insertNewRowBefore($bandera, 1);
            $sheet->setCellValue('A'.$bandera,$Herramientas[$i]['taqHer']);
            $sheet->setCellValue('B'.$bandera,$Herramientas[$i]['nombre']);
            $sheet->setCellValue('C'.$bandera,$Herramientas[$i]['serial']);
            $sheet->setCellValue('D'.$bandera,$Herramientas[$i]['area']);
            $sheet->setCellValue('E'.$bandera,$Herramientas[$i]['horasuso']);
            $spreadsheet->getActiveSheet()->getStyle('A'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('B'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('C'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('D'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $spreadsheet->getActiveSheet()->getStyle('E'.$bandera)->getFill()->getStartColor()->setARGB('FFFFFF');
            $bandera = $bandera + 1;
        }
        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=Listado_de_Herramientas.xlsx");
        header('Cache-Control: max-age=0');
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer -> save('php://output');
    }
}
