<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_omc extends Model
{
    use HasFactory;
    
    protected $table = 'docs_x_omc'; 
    
    protected $fillable = [
        'taqom',
        'nombre',
        'taqDoc',
        'DocURL'
    ];

    public function omc(){
        return $this->belongsTo(omc::class, 'taqom', 'taqom');
    }

}
