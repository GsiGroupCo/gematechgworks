<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_mtto_prev_x_activos_eli extends Model
{
    use HasFactory;

    protected $table = "docs_x_mtto_prev_x_activos_eli" ;

    protected $fillable = [
        'taqDeleteRegister',
        'taqDocMttoActivo',
        'taqActivos',
        'nombreDocumento',
        'taqresponsable'
    ];

    public function activo(){
        return $this->BelongsTo(activos::class, 'taqActivos', 'taqActivos');
    }

    public function Responsable(){
        return $this->BelongsTo(User::class, 'taqresponsable', 'taqresponsable');
    }

    public function mtto(){
        return $this->BelongsTo(documentos_x_mantenimiento_x_activos::class, 'taqDocMttoActivo', 'taqDocMttoActivo');
    }

}
