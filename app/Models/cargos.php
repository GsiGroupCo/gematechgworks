<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cargos extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_cargo',
        'cargo',
        'descripcion',
    ];

    public function Responsables(){
        return $this->hasMany(responsable::class,'id_cargo','id_cargo');
    }

    public function Usuarios(){
        return $this->hasMany(User::class,'id_cargo','id_cargo');
    }
}
