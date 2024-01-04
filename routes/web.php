<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExcelController;

use App\Http\Controllers\CargosController; 
use App\Http\Controllers\ResponsablesController;
use App\Http\Controllers\docsResponsableController;
use App\Http\Controllers\CategoriaActivoController;
use App\Http\Controllers\CategoriaComponenteController;
use App\Http\Controllers\ActivosController;
use App\Http\Controllers\docsComponenteController;
use App\Http\Controllers\CaracteristicasXActivoController;
use App\Http\Controllers\ComponentesController;
use App\Http\Controllers\CaracteristicasXComponentesController;
use App\Http\Controllers\CertificacionesXComponentesController;
use App\Http\Controllers\mantenimientosController;
use App\Http\Controllers\OmsController;
use App\Http\Controllers\RigsController; 
use App\Http\Controllers\ComponentesXActivoController;
use App\Http\Controllers\movactivosController;
use App\Http\Controllers\CertificacionesXActivoController;  
use App\Http\Controllers\documentsController;
use App\Http\Controllers\docsActivoController; 
use App\Http\Controllers\docsOmController;
use App\Http\Controllers\act_x_mantenimientoController; 
 
Route::get('/', function () {
    return  redirect('home');
}); 

Route::controller(AuthController::class) -> group(function () {
    Route::get('/home', 'Home')        -> name ('home') -> middleware('auth'); 
    Route::get('/login','Login')       -> name ('login'); 
    Route::post('/loginstore','Token') -> name ('login.store'); 
    Route::get('/logout','Logout')     -> name ('logout'); 
});

Route::controller(CargosController::class)->group(function () {
    Route::post('cargo/store', 'store')           -> name ( 'cargos.store' )  -> middleware('auth'); 
    Route::patch('cargo/update','update')         -> name ( 'cargos.update' ) -> middleware('auth');
    Route::get('cargo/show/{id_cargo}', 'show')   -> name ( 'cargos.show' )   -> middleware('auth'); 
});
 
Route::controller(ResponsablesController::class)->group(function () {
    Route::post('responsables/store', 'store')          -> name ('responsables.store')  -> middleware('auth');  
    Route::get('responsables/{responsables}', 'show')   -> name ('responsables.show')   -> middleware('auth');  
    Route::patch('responsables/update', 'update')       -> name ('responsables.update') -> middleware('auth'); 
    Route::post('responsables/ascend', 'ascend')        -> name ('responsables.ascend') -> middleware('auth'); 
});

Route::controller(docsResponsableController::class)->group(function () {
    Route::post('/documento/responsable/', 'store')          -> name('documentos.responsable.store')  -> middleware('auth');
    Route::post('/documento/responsable/delete/','delete')   -> name('documentos.responsable.delete') ->  middleware('auth'); 
});

Route::controller(CategoriaActivoController::class) -> group(function () {
    Route::post('categorias/activo/store', 'store')       -> name ('categorias.activo.store')     -> middleware('auth'); 
    Route::get('categorias/activo/{type}', 'show')        -> name ('categorias.activo.show')      -> middleware('auth'); 
    Route::patch('categorias/activo/updated', 'update')   -> name ('categorias.activo.updated')   -> middleware('auth'); 
});
 
Route::controller(CategoriaComponenteController::class) -> group(function () {
    Route::post('categorias/componente/store', 'store')       -> name ('categorias.componente.store')     -> middleware('auth'); 
    Route::get('categorias/componente/{type}', 'show')        -> name ('categorias.componente.show')      -> middleware('auth'); 
    Route::patch('categorias/componente/updated', 'update')  -> name ('categorias.componente.updated')   -> middleware('auth'); 
});

Route::controller(ActivosController::class)->group(function () {
    Route::post('activo/store','store')     ->  name('activos.store') -> middleware('auth');
    Route::get('activo/{activos}', 'show')  ->  name('activos.show')  -> middleware('auth'); 
    Route::post('activo/update', 'update')  ->  name('activos.update')-> middleware('auth'); 
});

Route::controller(ComponentesController::class)->group(function () {
    Route::post('componente/store','store')        ->  name('componentes.store')  -> middleware('auth');
    Route::get('componente/{componentes}', 'show') ->  name('componentes.show')   -> middleware('auth'); 
    Route::patch('componente/update', 'update')    ->  name('componentes.update') -> middleware('auth'); 
});

Route::controller(CaracteristicasXActivoController::class)->group(function () {
    Route::post('caracteristica/activo/store','store')                           -> name('caracteristica.activo.store')  -> middleware('auth');
    Route::patch('caracteristica/activo/update','update')                        -> name('caracteristica.activo.update') -> middleware('auth');
    Route::post('caracteristica/activo/delete','delete')  -> name('caracteristica.activo.delete') -> middleware('auth');
});

Route::controller(CaracteristicasXComponentesController::class)->group(function () {
    Route::post('caracteristica/componente/store','store')                           -> name('caracteristica.componente.store')  -> middleware('auth');
    Route::patch('caracteristica/componente/update','update')                        -> name('caracteristica.componente.update') -> middleware('auth');
    Route::post('caracteristica/componente/delete/{taqActivos}/{taqotro}','delete')  -> name('caracteristica.componente.delete') -> middleware('auth');
});
 
Route::controller(mantenimientosController::class)->group(function () {
    Route::post('mantenimiento/store', 'store')              -> name('mantenimiento.store')  ->middleware('auth'); 
    Route::post('mantenimiento/update','update')             -> name('mantenimiento.update') ->middleware('auth'); 
    Route::get('mantenimiento/show/{taqManto}','show')       -> name('mantenimiento.show')   ->middleware('auth'); 
});

Route::controller(OmsController::class)->group(function () {
    Route::post('oms/store', 'store')                   -> name ('oms.store')         -> middleware('auth');   
    Route::get('oms/{oms}', 'show')                     -> name ('oms.show')          -> middleware('auth'); 
    Route::post('oms/{oms}', 'update')                  -> name ('oms.update')        -> middleware('auth'); 
    Route::post('oms/open', 'open')                     -> name ('oms.open')          -> middleware('auth'); 
    Route::patch('oms/close', 'closed')                 -> name ('oms.close')         -> middleware('auth');
});

Route::controller(RigsController::class)->group(function () {
    Route::post('rigs/store', 'store')                  -> name ('rigs.store')         -> middleware('auth');   
    Route::get('rigs/{rigs}', 'show')                   -> name ('rigs.show')          -> middleware('auth'); 
    Route::post('rigs/{rigs}', 'update')                -> name ('rigs.update')        -> middleware('auth'); 
});

Route::controller(ComponentesXActivoController::class)->group(function () {;
    Route::post('componente/activo','store') -> name('componente.activo')  -> middleware('auth'); 
});

Route::controller(movactivosController::class)->group(function () {
    Route::post('movimiento/activo/store', 'store')           -> name('movimiento.activo.store') -> middleware('auth');
    Route::get('movimiento/activo/fin/{taqmovactivs}', 'fin') -> name('movimiento.activo.fin')   -> middleware('auth'); 
});

Route::controller(CertificacionesXActivoController::class)->group(function () {
    Route::post('certificacion/activos/store', 'store')                  -> name('CertificacionesActivos.store')    -> middleware('auth');
    Route::post('certificacion/activos/delete','delete')                 -> name('CertificacionesActivos.delete')   -> middleware('auth');  
    Route::get('certificacion/activos/{taqDoc}/{taqActivos}','caducado') -> name('CertificacionesActivos.caducado') -> middleware('auth');  
});

Route::controller(CertificacionesXComponentesController::class)->group(function () {
    Route::post('certificacion/componente/store', 'store')                     -> name('certificaciones.componentes.store')    -> middleware('auth');
    Route::post('certificacion/componente/delete','delete')                    -> name('certificaciones.componentes.delete')   -> middleware('auth');  
    Route::get('certificacion/componente/{taqDoc}/{taqcomponente}','caducado') -> name('certificaciones.componentes.caducado') -> middleware('auth');  
});

Route::controller(documentsController::class)->group(function () {
    Route::post('/documents/store','store')            -> name('docs.store')  -> middleware('auth');  
    Route::get('/documents/delete/{taqDoc}','delete')  -> name('docs.delete') -> middleware('auth');
    Route::get('/documents/show/{taqDoc}','show')      -> name('docs.show')   -> middleware('auth');
});

Route::controller(docsActivoController::class)->group(function () {
    Route::post('document/activo/', 'store')                            -> name('documentos.activos.store')->middleware('auth'); 
    Route::post('document/activo/mtto', 'storeMtto')                    -> name('documentos.activosMtto.store')->middleware('auth'); 
    Route::post('documento/activo/delete/','delete')                    -> name('documentos.activos.delete')->middleware('auth');  
    Route::post('DeleteDocsMttoActivo','deleteMtto')                    -> name('documentos.activos.mtto.delete')->middleware('auth'); 
});

Route::controller(docsComponenteController::class)->group(function () {
    Route::post('document/componente/', 'store')                 -> name('documentos.componentes.store')->middleware('auth'); 
    Route::post('document/componente/mtto', 'storeMtto')         -> name('documentos.componentesMtto.store')->middleware('auth'); 
    Route::post('documento/componente/delete/','delete')         -> name('documentos.componentes.delete')->middleware('auth');  
    Route::post('documento/mtto/componente/delete','deleteMtto') -> name('documentos.componentes.mtto.delete')->middleware('auth'); 
});

Route::controller(docsOmController::class)->group(function () {
    Route::post('documentos/om/store', 'store')  -> name('documentos.store')  -> middleware('auth'); 
    Route::post('documentos/om/delete','delete') -> name('documentos.delete') -> middleware('auth');
});

Route::controller(act_x_mantenimientoController::class)->group(function () {
    Route::post('actividades/mantenimiento/store', 'store')     -> name('actividad.mantenimiento.store')   ->middleware('auth'); 
    Route::post('actividades/mantenimiento/update','update')    -> name('actividad.mantenimiento.update')  ->middleware('auth'); 
    Route::post('actividades/mantenimiento/delete','delete')    -> name('actividad.mantenimiento.delete')  ->middleware('auth');
});
  
Route::controller(ExcelController::class)->group(function () {
    Route::get('getfile/{taqsolicitud}', 'get_solicitud')                                                      -> name('file.down')              -> middleware('auth');
    Route::get('Download/ot/{taqot}', 'Download_ot_report')                                                    -> name('ot.down')                -> middleware('auth');
    Route::get('Download/activo/{taqActivos}', 'Download_reistro_activo')                                      -> name('activos.down')           -> middleware('auth');    
    Route::get('Download/activo/ficha_tecnica/{taqActivos}', 'Download_ficha_tecnica')                         -> name('fichatecnica.down')      -> middleware('auth');
    Route::get('FichaMantenimientoPreventivoActivo/{taqmttActivo}', 'formatoMantenimientoPreventivoActivo')    -> name('fichamantoprevact.down') -> middleware('auth'); 
    Route::get('FichaMantenimientoCorrectivaActivo/{taqmttActivo}', 'formatoMantenimientoCorrectivoActivo')    -> name('fichamantocorract.down') -> middleware('auth');
    Route::get('ListaOts', 'ListOts')                                                                          -> name('listots')                -> middleware('auth');
    Route::get('Download/componentes', 'ListComponentes')                                                      -> name('ListComponentes')        -> middleware('auth');
    Route::get('Download/activos', 'ListActivos')                                                              -> name('ListActivos')            -> middleware('auth');
});


