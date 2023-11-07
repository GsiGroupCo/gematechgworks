<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mtto_corr_x_componentes extends Model
{
    use HasFactory;

    protected $fillable = [
        'mtto_id',
        'taqComponente',
        'taqManto',
        'taqresponsable',
        'actividad',
        'area',
        'cantDocs',
        'estado',
        'fecha',
        'fechaFin'
    ];

    public function Componente(){
        return $this->belongsTo(componentes::class,'taqComponente', 'taqComponente');
    }

    public function Responsable(){
         return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    }

    public function Actividades_Pendientes(){
        return $this->hasMany(act_corr_x_componente::class,'mtto_id', 'mtto_id');
    }

    public function Actividades_Finalizadas(){
        return $this->hasMany(act_corr_x_componente_cump::class,'mtto_id', 'mtto_id');
    }
    
    public function Documentos(){
        return $this->hasMany(documentos_x_mantenimiento_x_componentes::class,'mtto_id', 'mtto_id');
    }
}
