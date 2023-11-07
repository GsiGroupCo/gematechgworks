<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_componentes extends Model
{
    use HasFactory;

    protected $table = 'docs_x_componentes'; 

    protected $fillable = [
        'taqComponente',
        'nombre',
        'taqDoc',
        'DocURL'
    ];

    public function Componentes(){
        return $this->BelongsTo(componentes::class, 'taqComponente', 'taqComponente');
    }

}
