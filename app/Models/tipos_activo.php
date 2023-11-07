<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tipos_activo extends Model
{
    use HasFactory;

    protected $table = 'tipos_activo'; 

    protected $fillable = [
        'id_tipo',
        'nombre',
        'taq_activo_base',
    ];

    public function Activos(){
        return $this->hasMany(activos::class,'id_tipo', 'id_tipo');
    }

}
