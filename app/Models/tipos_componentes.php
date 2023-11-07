<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tipos_componentes extends Model
{
    use HasFactory;

    protected $table = 'tipos_componentes'; 

    protected $fillable = [
        'id_tipo',
        'nombre',
        'taq_componente_base',
    ];

    public function Componentes(){
        return $this->hasMany(componentes::class,'id_tipo', 'id_tipo');
    }

}
