<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_corr_x_componente extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_act_x_comp',
        'mtto_id',
        'taqresponsable',
        'nombre',
        'estado',
        'fecha',
        'fechaFin'
    ];

    public function Responsables(){
        return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    }

    public function Mantenimiento_Correctivos(){
        return $this->belongsTo(mtto_correctivos_x_componentes::class,'mtto_id', 'mtto_id');
    }

}
