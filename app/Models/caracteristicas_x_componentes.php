<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class caracteristicas_x_componentes extends Model
{
    use HasFactory;

    protected $table = 'caracteristicas_x_componentes'; 

    protected $fillable = [
        'taqotro',
        'taqComponente',
        'nombre',
        'value',
    ];

    public function Componentes(){
        return $this->BelongsTo(componentes::class,'taqComponente','taqComponente');
    }
}
