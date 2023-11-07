<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mtto_prev_x_componentes extends Model
{
    use HasFactory;

    protected $fillable = [
        'mtto_id',
        'taqManto',
        'actividad',
        'taqComponente',
        'cantDocs',
        'area',
        'taqresponsable',
        'estado',
        'fecha',
        'fechaFin',
    ];

    public function Componente(){
        return $this->belongsTo(componentes::class,'taqComponente', 'taqComponente');
    }
    public function Responsable(){
        return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    }    
    public function Actividades_Pendientes(){
        return $this->hasMany(act_prev_x_activos::class,'mtto_id', 'mtto_id');
    }
    public function Actividades_Finalizadas(){
        return $this->hasMany(act_prev_x_activos_cump::class,'mtto_id', 'mtto_id');
    }
    public function Documentos(){
        return $this->hasMany(docsmantopreventivoactivo::class,'mtto_id', 'mtto_id');
    }
    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos::class,'taqManto', 'taqManto');
    }
}
