<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_mtto_prev_x_activos extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqDocMttoActivo',
        'taqActivos',
        'nombre',
        'DocURL',
    ];

    public function Activo(){
        return $this->belongsTo(activo::class,'taqActivos', 'taqActivos');
    }

    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_mtto_prev_x_activos_eli::class,'taqDocMttoActivo', 'taqDocMttoActivo');
    }
}
