<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class area extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqarea',
        'nombre',
    ];

    public function areaot(){
        return $this->hasMany(areas_x_ot::class,'taqarea', 'taqarea');
    }
}
