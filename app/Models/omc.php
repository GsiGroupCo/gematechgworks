<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class omc extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqom'           ,
        'taqComponente'   ,
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

    public function Componente(){
        return $this->belongsTo(componentes::class, 'taqComponente', 'taqComponente');
    }
    
    public function Responsable(){
        return $this->belongsTo(responsable::class, 'taqresponsable', 'taqresponsable');
    }
    
    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos_x_componentes::class, 'taqMantenimiento', 'taqMantenimiento');
    }
    
    public function Documentos(){
        return $this->hasMany(docs_x_omc::class, 'taqom', 'taqom');
    }

    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_omc_eli::class, 'taqom', 'taqom');
    } 
    
    public function Actividades(){
        return $this->hasMany(act_x_omc::class, 'taqom', 'taqom');
    }
    
}
