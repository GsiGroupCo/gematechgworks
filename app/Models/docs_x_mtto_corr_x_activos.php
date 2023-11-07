<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_mtto_corr_x_activos extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_documento',
        'taqmttActivo',
        'taqActivos',
        'nombre',
        'DocURL',
    ];

    public function Activo(){
        return $this->belongsTo(activo::class,'taqActivos', 'taqActivos');
    }

    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_mtto_corr_x_activos_eli::class,'taqmttActivo', 'taqmttActivo');
    }
}
