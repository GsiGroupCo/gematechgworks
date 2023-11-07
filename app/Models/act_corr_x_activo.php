<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_corr_x_activo extends Model
{
    use HasFactory;

    protected $table = 'act_corr_x_activo';

    protected $fillable = [
        'taqActCorrAct',
        'taqmttActivo',
        'taqresponsable',
        'nombre',
        'estado',
        'fecha',
        'fechaFin'
    ];

    public function responsables(){
        return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    }

    public function Mantenimiento_Correctivos(){
        return $this->belongsTo(mtto_correctivo_x_activos::class,'taqmttActivo', 'taqmttActivo');
    }

}
