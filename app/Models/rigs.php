<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rigs extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqrig',
        'nombre',
    ];

    public function Movimientos(){
        return $this->hasMany(movimientos_x_activos::class,'taqrig', 'taqrig');
    }
}
