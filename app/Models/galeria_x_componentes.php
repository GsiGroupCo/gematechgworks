<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class galeria_x_componentes extends Model
{
    use HasFactory;
 
    protected $fillable = [
        'foto_id',
        'taqComponente',
        'Image'
    ]; 

    public function Componentes(){
        return $this->belongsTo(componentes::class,'taqComponente', 'taqComponente');
    }

}
