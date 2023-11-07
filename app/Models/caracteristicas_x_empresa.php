<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class caracteristicas_x_empresa extends Model
{
    use HasFactory;

    
    protected $table = 'caracteristicas_x_empresa'; 

    protected $fillable = [
        'taqotro',
        'taqempresa',
        'nombre',
        'value',
    ];

    public function  empresa(){
        return $this->BelongsTo(empresas::class,'taqempresa','taqempresa');
    }
}
