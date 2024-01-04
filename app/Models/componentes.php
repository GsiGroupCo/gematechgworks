<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class componentes extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqComponente',
        'categoria_id', 
        'estado',
        'nombre',
        'descripcion',
        'serial',
        'dependencia',
        'horasuso',
        'urlImage',
    ];

    public function Historial_Activos(){
        return $this->belongsTo(componente_x_activos::class,'taqComponente','taqComponente');
    }
    public function Galeria(){
        return $this->hasMany(galeria_x_componentes::class,'taqComponente','taqComponente');
    }
    public function Categoria(){
        return $this->belongsTo(categoria_componentes::class,'categoria_id','categoria_id');
    }
    public function Actividad_Mantenimiento(){
        return $this->belongsTo(act_x_mantenimiento::class,'taqComponente','taqComponente');
    }
    public function Caracteristicas(){
        return $this->hasMany(caracteristicas_x_componentes::class,'taqComponente','taqComponente');
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
}
