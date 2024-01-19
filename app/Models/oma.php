<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class oma extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqom'           ,
        'taqActivos'      ,
        'taqresponsable'  ,
        'taqMantenimiento',
        'fechainicio'     ,
        'horainicio'      ,
        'fechafin'        ,
        'descripcion'     ,
        'horafin'         ,
        'tipo'            ,
        'prioridad'       ,
        'estado'          ,
    ];

    public function Activos(){
        return $this->belongsTo(activos::class, 'taqActivos', 'taqActivos');
    }
    
    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos_x_activos::class, 'taqMantenimiento', 'taqMantenimiento');
    }
        
    public function Responsable(){
        return $this->belongsTo(responsable::class, 'taqresponsable', 'taqresponsable');
    }
    
    public function Documentos(){
        return $this->hasMany(docs_x_oma::class, 'taqom', 'taqom');
    }

    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_oma_eli::class, 'taqom', 'taqom');
    } 
    
    public function Actividades(){
        return $this->hasMany(act_x_oma::class, 'taqom', 'taqom');
    }
    
}
