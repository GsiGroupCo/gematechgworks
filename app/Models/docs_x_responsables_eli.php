<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_responsables_eli extends Model
{
    use HasFactory;

    protected $fillable = [
        'documento_eliminado_id',
        'documento_id',
        'taqresponsable',
        'nombre',
    ];

    public function Responsable(){
        return $this->BelongsTo(responsable::class, 'taqresponsable', 'taqresponsable');
    }

}
