<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_mtto_corr_x_herramientas_eli extends Model
{
    use HasFactory;

    protected $table = 'docs_x_mtto_corr_x_herramientas_eli';

    protected $fillable = [
        'taqDocMttoHerramienta',
        'taqHer',
        'nombre',
        'DocURL',
    ];

    public function Herramienta(){
        return $this->belongsTo(herramienta::class,'taqHer', 'taqHer');
    }
}
