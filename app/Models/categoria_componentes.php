<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categoria_componentes extends Model
{
    use HasFactory;

    protected $table = 'categoria_componentes'; 

    protected $fillable = [
        'categoria_id',
        'nombre',
        'taq',
    ];

    public function Componentes(){
        return $this->hasMany(componentes::class,'categoria_id', 'categoria_id');
    }
}
