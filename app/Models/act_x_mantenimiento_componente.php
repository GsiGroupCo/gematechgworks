<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_x_mantenimiento_componente extends Model
{
    use HasFactory; 

    protected $table = 'act_x_mantenimiento_componente';

    protected $fillable = [
        'actividad_id', 
        'taqMantenimiento',
        'nombre',
        'descripcion',
        'sistema',
        'frecuencia',
        'tipofrecuencia'
    ];

    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos_x_componentes::class,'taqMantenimiento', 'taqMantenimiento');
    } 
}
