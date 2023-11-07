<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_responsables extends Model
{
    use HasFactory;

    protected $fillable = [
        'documento_id',
        'taqresponsable',
        'nombre',
        'url'
    ];

    public function Responsable(){
        return $this->BelongsTo(responsable::class, 'taqresponsable', 'taqresponsable');
    }

}
