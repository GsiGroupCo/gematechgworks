<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mtto_corr_x_activos extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqmttActivo',
        'actividad',
        'taqActivos',
        'preoperacional',
        'taqresponsable',
        'area',
        'estado',
        'fecha',
        'fechaFin'
    ];

    public function Activo(){
        return $this->belongsTo(activos::class,'taqActivos', 'taqActivos');
    }

    public function Responsable(){
         return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    }

    public function Actividades_Pendientes(){
        return $this->hasMany(act_corr_x_activo::class,'taqmttActivo', 'taqmttActivo');
    }

    public function Actividades_Finalizadas(){
        return $this->hasMany(act_corr_x_activo_cump::class,'taqmttActivo', 'taqmttActivo');
    }
    
    public function Documentos(){
        return $this->hasMany(docs_x_mtto_corr_x_activos::class,'taqmttActivo', 'taqmttActivo');
    }

    public function Areas(){
        return $this->belongsTo(area::class,'area', 'taqarea');
    }
}
