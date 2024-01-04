<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class galeria_x_activos extends Model
{
    use HasFactory;

    protected $fillable = [
        'foto_id',
        'taqActivos',
        'Image'
    ]; 

    public function Activos(){
        return $this->belongsTo(activos::class,'taqActivos', 'taqActivos');
    }
 
}
