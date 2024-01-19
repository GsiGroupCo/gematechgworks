<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_oma_eli extends Model
{
    use HasFactory;

    protected $table = 'docs_x_oma_eli';

    protected $fillable = [
        'taqDeleteRegister',
        'taqom',
        'nombreDocumento',
        'taqresponsable'
    ];

    public function oma(){
        return $this->BelongsTo(oma::class, 'taqom', 'taqom');
    }

    public function Responsable(){
        return $this->BelongsTo(User::class, 'taqresponsable', 'taqresponsable');
    }

}
