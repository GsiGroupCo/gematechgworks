<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_activo extends Model
{
    use HasFactory;

    protected $table = 'docs_x_activo'; 

    protected $fillable = [
        'taqActivos',
        'nombre',
        'taqDoc',
        'DocURL'
    ];

    public function activos(){
        return $this->BelongsTo(activos::class, 'taqActivos', 'taqActivos');
    }

}
