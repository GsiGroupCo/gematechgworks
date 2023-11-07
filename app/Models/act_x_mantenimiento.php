<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class act_x_mantenimiento extends Model
{
    use HasFactory;

    protected $table = 'act_x_mantenimiento';

    protected $fillable = [
        'actividad_id',
        'nombre',
        'sistema',
        'componente',
        'frecuencia',
        'taqManto',
        'tipofrecuencia'
    ];

    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos::class,'taqManto', 'taqManto');
    }

}
