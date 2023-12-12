<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class galeria_x_componentes extends Model
{
    use HasFactory;
 
    protected $fillable = [
        'id_foto',
        'taqComponente',
        'Image'
    ]; 

    public function Componentes(){
        return $this->belongsTo(componentes::class,'taqComponente', 'taqComponente');
    }

}
