<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_x_mantenimiento_activo extends Model
{
    use HasFactory;

    protected $table = 'act_x_mantenimiento_activo';

    protected $fillable = [
        'taqMantenimiento',
        'actividad_id',
        'nombre',
        'descripcion',
        'sistema',
        'frecuencia',
        'tipofrecuencia',
    ];

    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos_x_activos::class,'taqMantenimiento', 'taqMantenimiento');
    }

}
