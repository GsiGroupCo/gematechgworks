<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class areas_x_ot extends Model
{
    use HasFactory;

    protected $table = 'areas_x_om'; 

    protected $fillable = [
        'taqarea',
        'taqom',
    ];

    public function Area(){
        return $this->hasMany(area::class,'taqarea', 'taqarea');
    }

    public function ot(){
        return $this->hasMany(ot::class,'taqom', 'taqom');
    }
}
