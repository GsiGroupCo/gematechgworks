<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cert_x_activo_eli extends Model
{
    use HasFactory;

    protected $table = 'cert_x_activo_eli';

    protected $fillable = [
        'taqDeleteRegister',
        'taqActivos',
        'nombreDocumento',
        'taqresponsable'
    ];

    public function Activo(){
        return $this->BelongsTo(activos::class, 'taqActivos', 'taqActivos');
    }

    public function Responsable(){
        return $this->BelongsTo(User::class, 'taqresponsable', 'taqresponsable');
    }

}
