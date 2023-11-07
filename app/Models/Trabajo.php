<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trabajo extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqtrabajo',
        'taqresponsable',
        'taqempresa',
        'taqom',
        'nombre',
        'descripcion',
        'cantHoras',
        'estado',
    ];

    public function Om(){
        return $this->belongsTo(om::class, 'taqom', 'taqom');
    }

    public function Responsable(){
        return $this->belongsTo(responsable::class, 'taqresponsable', 'taqresponsable');
    }

}
