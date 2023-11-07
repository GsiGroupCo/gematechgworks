<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_mtto_corr_x_activos_eli extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_documento',
        'taqresponsable',
        'nombre',
        'DocURL',
    ];

    public function Documento(){
        return $this->belongsTo(docs_x_mtto_corr_x_activos::class,'id_documento', 'id_documento');
    }

    public function Responsable(){
        return $this->belongsTo(user::class,'taqresponsable', 'taqresponsable');
    }
}
