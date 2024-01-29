<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_x_omc_x_responsable extends Model
{
    use HasFactory; 

    protected $table = 'act_x_omc_x_responsable';

    protected $fillable = [
        'id_registro_actividad',
        'actividad_id',
        'taqresponsable'
    ];

    public function Responsable(){
        return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    } 
    public function Actividad(){
        return $this->belongsTo(act_x_omc::class,'actividad_id', 'actividad_id');
    } 
}
