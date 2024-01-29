<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_x_oma extends Model
{
    use HasFactory; 

    protected $table = 'act_x_oma';

    protected $fillable = [
        'actividad_id',
        'taqom',
        'taqMantenimiento',
        'nombre',
        'descripcion',
        'estado'
    ];

    public function OrdenMantenimiento(){
        return $this->belongsTo(oma::class,'taqom', 'taqom');
    } 
    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos_x_activos::class,'taqMantenimiento', 'taqMantenimiento');
    } 
    public function Responsable(){
        return $this->hasMany(act_x_oma_x_responsable::class,'actividad_id', 'actividad_id');
    } 
}
