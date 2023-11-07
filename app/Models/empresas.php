<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class empresas extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqempresa',
        'nombre',
        'urlImage',
    ];

    public function Om(){
        return $this->hasMany(om::class,'taqempresa','taqempresa');
    }
  
    public function Caracteristicas(){
        return $this->hasMany(caracteristicas_x_empresa::class, 'taqempresa', 'taqempresa');
    }
 
}
