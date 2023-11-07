<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cert_x_activo extends Model
{
    use HasFactory;

    protected $table = 'cert_x_activo'; 
    
    protected $fillable = [
        'taqActivos',
        'nombre',
        'taqDoc',
        'fechacertificion',
        'frecuencia',
        'estado',
        'DocURL'
    ];

    public function Activos(){
        return $this->BelongsTo(activos::class, 'taqActivos', 'taqActivos');
    }

}
