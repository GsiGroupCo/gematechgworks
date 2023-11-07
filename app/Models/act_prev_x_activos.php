<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_prev_x_activos extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqActPrevact',
        'taqmttActivo',
        'taqresponsable',
        'nombre',
        'frecuencia',
        'estado',
        'fecha',
        'fechaFin'
    ];

    public function Responsables(){
        return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    }

    public function Mantenimiento(){
        return $this->belongsTo(mtto_preventivos_x_activos::class,'taqmttActivo', 'taqmttActivo');
    }

    public function Documentos(){
        return $this->belongsTo(docsmantopreventivoactivo::class,'taqmttActivo', 'taqmttActivo');
    }

}
