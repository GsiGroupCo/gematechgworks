<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_om extends Model
{
    use HasFactory;
    
    protected $table = 'docs_x_om'; 
    
    protected $fillable = [
        'taqom',
        'nombre',
        'taqDoc',
        'DocURL'
    ];

    public function oms(){
        return $this->belongsTo(ot::class, 'taqom', 'taqom');
    }

}
