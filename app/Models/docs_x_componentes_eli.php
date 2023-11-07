<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_componentes_eli extends Model
{
    use HasFactory;

    protected $table = 'docs_x_componentes_eli';

    protected $fillable = [
        'taqDeleteRegister',
        'taqComponente',
        'nombreDocumento',
        'taqresponsable'
    ];

    public function Componente(){
        return $this->BelongsTo(componentes::class, 'taqComponente', 'taqComponente');
    }

    public function Responsable(){
        return $this->BelongsTo(User::class, 'taqresponsable', 'taqresponsable');
    }

}
