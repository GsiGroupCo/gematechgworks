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
        'taqComponente',
        'nombre',
        'sistema',
        'frecuencia',
        'taqmantenimiento',
        'tipofrecuencia'
    ];

    public function Mantenimiento(){
        return $this->belongsTo(mantenimientos_x_om::class,'taqmantenimiento', 'taqmantenimiento');
    }

    public function Componente(){
        return $this->belongsTo(componentes::class,'taqComponente', 'taqComponente');
    }

}
