<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_omc_eli extends Model
{
    use HasFactory;

    protected $table = 'docs_x_omc_eli';

    protected $fillable = [
        'taqDeleteRegister',
        'taqom',
        'nombreDocumento',
        'taqresponsable'
    ];

    public function omc(){
        return $this->BelongsTo(omc::class, 'taqom', 'taqom');
    }

    public function Responsable(){
        return $this->BelongsTo(User::class, 'taqresponsable', 'taqresponsable');
    }

}
