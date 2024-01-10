<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cargos extends Model
{
    use HasFactory;

    protected $fillable = [
        'cargo_id',
        'cargo',
        'descripcion',
    ];

    public function Responsables(){
        return $this->hasMany(responsable::class,'cargo_id','cargo_id');
    }

    public function Usuarios(){
        return $this->hasMany(User::class,'cargo_id','cargo_id');
    }
}
