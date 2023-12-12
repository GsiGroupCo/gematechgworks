<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class activos extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqActivos',
        'id_tipo', 
        'nombre',
        'descripcion',
        'serial', 
        'horasuso',
        'urlImage',
    ];

    public function Tipo(){
        return $this->belongsTo(tipos_activo::class,'id_tipo','id_tipo');
    }

    public function Componente(){
        return $this->hasMany(componente_x_activos::class,'taqActivos','taqActivos');
    }

    public function Galeria(){
        return $this->hasMany(galeria_x_activos::class,'taqActivos','taqActivos');
    }
    
    public function Movimiento(){
        return $this->hasMany(movimientos_x_activos::class,'taqActivos','taqActivos');
    }

    public function Mantenimientos(){
        return $this->hasMany(activos_x_om::class,'taqActivos','taqActivos');
    }
    
    public function Caracteristicas(){
        return $this->hasMany(caracteristicas_x_activo::class,'taqActivos','taqActivos');
    }

    public function Documentos(){
        return $this->hasMany(docs_x_activo::class,'taqActivos', 'taqActivos');
    }

    public function Documentos_Eliminados(){
        return $this->hasMany(docs_x_activo_eli::class,'taqActivos','taqActivos');
    }

    public function Certificaciones(){
        return $this->hasMany(cert_x_activo::class,'taqActivos','taqActivos');
    }

    public function Certificaciones_Eliminadas(){
        return $this->hasMany(cert_x_activo_eli::class,'taqActivos','taqActivos');
    }

    public function Mantenimientos_Preventivos(){
        return $this->hasMany(mtto_prev_x_activos::class,'taqActivos', 'taqActivos');
    }

    public function Documentos_Preventivos(){
        return $this->hasMany(docs_x_mtto_prev_x_activos::class,'taqActivos', 'taqActivos');
    }

    public function Documentos_Preventivos_Eliminados(){
        return $this->hasMany(docs_x_mtto_prev_x_activos_eli::class,'taqActivos','taqActivos');
    }  
    
    public function Mantenimientos_Correctivos(){
        return $this->hasMany(mtto_corr_x_activos::class,'taqActivos', 'taqActivos');
    }


    

    

    

    



}
