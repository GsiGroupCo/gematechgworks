<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class om extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqom'         ,
        'taqempresa'    ,
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


    public function Movimientos(){
        return $this->hasMany(movimientos_x_activos::class, 'taqom', 'taqom');
    }
    
    public function Documentos(){
        return $this->hasMany(docs_x_om::class, 'taqom', 'taqom');
    }

    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_om_eli::class, 'taqom', 'taqom');
    }

    public function Areas(){
        return $this->hasMany(areas_x_om::class, 'taqom', 'taqom');
    }

    public function Trabajos(){
        return $this->hasMany(Trabajo::class, 'taqom', 'taqom');
     }

    public function Responsable(){
        return $this->belongsTo(responsable::class, 'taqresponsable', 'taqresponsable');
    }

    public function Requerimiento(){
        return $this->hasMany(requerimientos::class, 'taqom', 'taqom');
    }

    public function  empresa(){
        return $this->belongsTo(empresas::class, 'taqempresa', 'taqempresa');
    }

    public function Activos(){
        return $this->hasMany(activos_x_om::class, 'taqom', 'taqom');
    }

    public function Componentes(){
        return $this->hasMany(componente_x_activos::class, 'taqom', 'taqom');
    }


}
