<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class movimientos_x_activos extends Model
{   

    use HasFactory;

    protected $fillable = [
        'taqmovactivs',
        'taqrig',
        'taqActivos',
        'taqom',
        'fechaSalida',
        'fechaRetorno',
        'estado',
        'descripcion',
    ];

    public function Activo(){
        return $this->belongsTo(activos::class,'taqActivos', 'taqActivos');
    }

    public function Om(){
        return $this->belongsTo(om::class, 'taqot', 'taqot');
    }

    public function Rig(){
        return $this->belongsTo(rig::class, 'taqrig', 'taqrig');
    }

}
