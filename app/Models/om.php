<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class om extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqom'         ,
        'taqActivos'    ,
        'taqresponsable',
        'fechainicio'   ,
        'horainicio'    ,
        'fechafin'      ,
        'descripcion'   ,
        'horafin'       ,
        'tipo'          ,
        'prioridad'     ,
        'estado'        ,
    ];

    public function Activos(){
        return $this->belongsTo(activos::class, 'taqActivos', 'taqActivos');
    }
    
    public function Responsable(){
        return $this->belongsTo(responsable::class, 'taqresponsable', 'taqresponsable');
    }
    
    public function Documentos(){
        return $this->hasMany(docs_x_om::class, 'taqom', 'taqom');
    }

    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_om_eli::class, 'taqom', 'taqom');
    } 
    
    public function Mantenimientos(){
        return $this->hasMany(mantenimientos_x_om::class, 'taqom', 'taqom');
    }
    
}
