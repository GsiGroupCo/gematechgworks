<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class activos_x_om extends Model
{
    use HasFactory;

    protected $table = 'activos_x_om'; 

    protected $fillable = [
        'taqregisterActOt',
        'taqom',
        'taqActivos'
    ];


    public function Activos(){
        return $this->belongsTo(activos::class, 'taqActivos', 'taqActivos');
    }

    public function OM(){
        return $this->hasMany(ot::class, 'taqom', 'taqom');
    }

}
