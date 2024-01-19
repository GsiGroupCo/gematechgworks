<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categorias_activo extends Model
{
    use HasFactory;

    protected $table = 'categorias_activo'; 

    protected $fillable = [
        'categoria_id',
        'nombre',
        'taq',
    ];

    public function Activos(){
        return $this->hasMany(activos::class,'categoria_id', 'categoria_id');
    }

    public function Mantenimiento_Activo(){
        return $this->hasMany(mantenimientos_x_activos::class,'categoria_id', 'categoria_id');
    }

}
