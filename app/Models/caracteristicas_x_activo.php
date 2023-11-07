<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class caracteristicas_x_activo extends Model
{
    use HasFactory;

    protected $table = 'caracteristicas_x_activo'; 

    protected $fillable = [
        'taqotro',
        'taqActivos',
        'nombre',
        'value',
    ];

    public function Activo(){
        return $this->BelongsTo(activos::class,'taqActivos','taqActivos');
    }
}
