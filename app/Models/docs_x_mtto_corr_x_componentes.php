<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docs_x_mtto_x_componentes extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_doc_mtto_com',
        'taqComponente',
        'nombre',
        'DocURL',
    ];

    public function Componente(){
        return $this->belongsTo(componentes::class,'taqComponente', 'taqComponente');
    }
    
    public function Documentos_Eliminados(){
        return $this->hasMany(doc_x_mtto_x_componente_eliminados::class,'id_doc_mtto_com', 'id_doc_mtto_com');
    }
}
