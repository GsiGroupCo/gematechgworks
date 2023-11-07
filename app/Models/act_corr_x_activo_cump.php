<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_corr_x_activo_cump extends Model
{
    use HasFactory;

    protected $table = 'act_corr_x_activo_cump';

    protected $fillable = [
        'act_corr_act',
        'taqmttActivo',
        'taqresponsable',
        'nombre',
        'estado',
        'fecha',
    ];

    public function Responsables(){
        return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    }

    public function Mantenimiento_Correctivos(){
        return $this->belongsTo(mtto_correctivo_x_activos::class,'taqmttActivo', 'taqmttActivo');
    }

}
