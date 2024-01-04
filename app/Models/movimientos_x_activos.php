<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class movimientos_x_activos extends Model
{   

    use HasFactory;

    protected $fillable = [
        'taq_movimiento',
        'taqrig',
        'taqActivos',
        'fechaSalida',
        'fechaRetorno',
        'estado',
        'descripcion',
    ];

    public function Activo(){
        return $this->belongsTo(activos::class,'taqActivos', 'taqActivos');
    }

    public function Rig(){
        return $this->belongsTo(rigs::class, 'taqrig', 'taqrig');
    }

}
