<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cert_x_componente extends Model
{
    use HasFactory;

    protected $table = 'cert_x_componente'; 
    
    protected $fillable = [
        'taqComponente',
        'nombre',
        'taqDoc',
        'fechacertificion',
        'frecuencia',
        'estado',
        'DocURL'
    ];

    public function Componente(){
        return $this->BelongsTo(componentes::class, 'taqComponente', 'taqComponente');
    }

}
