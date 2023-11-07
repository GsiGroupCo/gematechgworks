<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cert_x_componentes_eli extends Model
{
    use HasFactory;

    protected $table = 'cert_x_componentes_eli';

    protected $fillable = [
        'delete_id',
        'taqComponente',
        'nombreDocumento',
        'taqresponsable'
    ];

    public function Componente(){
        return $this->BelongsTo(certificaciones_x_componente::class, 'taqComponente', 'taqComponente');
    }

    public function Responsable(){
        return $this->BelongsTo(User::class, 'taqresponsable', 'taqresponsable');
    }

}
