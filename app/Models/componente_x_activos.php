<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class componente_x_activos extends Model
{
    use HasFactory;

    protected $table = 'componentes_x_activos'; 

    protected $fillable = [
        'taq_historial',
        'taqComponente',
        'taqActivos',
        'estado',
        'fecha_acople',
        'fecha_desacople'
    ];


    public function Activos(){
        return $this->belongsTo(activos::class, 'taqActivos', 'taqActivos');
    }

    public function Componente(){
        return $this->hasMany(componentes::class, 'taqComponente', 'taqComponente');
    } 
}
