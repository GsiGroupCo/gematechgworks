<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_oma extends Model
{
    use HasFactory;
    
    protected $table = 'docs_x_oma'; 
    
    protected $fillable = [
        'taqom',
        'nombre',
        'taqDoc',
        'DocURL'
    ];

    public function oma(){
        return $this->belongsTo(oma::class, 'taqom', 'taqom');
    }

}
