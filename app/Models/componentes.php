<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class componentes extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqComponente',
        'id_tipo', 
        'estado',
        'nombre',
        'descripcion',
        'serial',
        'dependencia',
        'horasuso',
        'urlImage',
    ];

    public function Activo(){
        return $this->belongsTo(componente_x_activos::class,'taqComponente','taqComponente');
    }
    public function Galeria(){
        return $this->hasMany(galeria_x_componentes::class,'taqComponente','taqComponente');
    }
    public function Categoria(){
        return $this->belongsTo(tipos_componentes::class,'id_tipo','id_tipo');
    }
    public function Caracteristicas(){
        return $this->hasMany(caracteristicas_x_componentes::class,'taqComponente','taqComponente');
    }

    public function Actividades(){
        return $this->hasMany(componente_x_activos::class,'taqComponente','taqComponente');
    }

    public function Documentos(){
        return $this->hasMany(docs_x_componentes::class,'taqComponente','taqComponente');
    }
    
    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_componentes_eli::class,'taqComponente','taqComponente');
    }

    public function Certificaciones(){
        return $this->hasMany(cert_x_componente::class,'taqComponente','taqComponente');
    }
    
    public function Certificaciones_Eliminadas(){
        return $this->hasMany(cert_x_componentes_eli::class,'taqComponente','taqComponente');
    }

    public function Mttos_Correctivos(){
        return $this->hasMany(mtto_corr_x_componentes::class,'taqComponente','taqComponente');
    }

    public function Mttos_Preventivos(){
        return $this->hasMany(mtto_prev_x_componentes::class,'taqComponente','taqComponente');
    }

}
