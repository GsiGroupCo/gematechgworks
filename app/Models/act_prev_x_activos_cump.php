<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_prev_x_activos_cump extends Model
{
    use HasFactory;

    protected $table = 'act_prev_x_activos_cump';

    protected $fillable = [
        'taqActPrevact',
        'taqmttActivo',
        'taqresponsable',
        'nombre',
        'frecuencia',
        'estado',
        'fecha',
    ];

    public function Responsables(){
        return $this->belongsTo(User::class,'taqresponsable', 'taqresponsable');
    }

    public function Mantenimiento(){
        return $this->belongsTo(mtto_preventivos_x_activos::class,'taqmttActivo', 'taqmttActivo');
    }

}
