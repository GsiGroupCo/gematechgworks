<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_x_omc extends Model
{
    use HasFactory; 

    protected $table = 'act_x_omc';

    protected $fillable = [
        'actividad_id',
        'taqom',
        'taqMantenimiento',
        'taqresponsable',
        'nombre',
        'descripcion',
        'estado'
    ];

    public function OrdenMantenimiento(){
        return $this->belongsTo(omc::class,'taqom', 'taqom');
    } 
    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos_x_componentes::class,'taqMantenimiento', 'taqMantenimiento');
    } 
    public function Responsable(){
        return $this->belongsTo(responsable::class,'taqresponsable', 'taqresponsable');
    } 
}
