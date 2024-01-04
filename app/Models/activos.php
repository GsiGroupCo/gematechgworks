<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class activos extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqActivos',
        'categoria_id', 
        'nombre',
        'descripcion',
        'estado',
        'serial', 
        'horasuso',
        'urlImage',
    ];

    public function Categoria(){
        return $this->belongsTo(categorias_activo::class,'categoria_id','categoria_id');
    }

    public function OrdenesMantenimiento(){
        return $this->hasMany(om::class,'taqActivos','taqActivos');
    }

    public function Historial(){
        return $this->hasMany(componente_x_activos::class,'taqActivos','taqActivos');
    }

    public function Galeria(){
        return $this->hasMany(galeria_x_activos::class,'taqActivos','taqActivos');
    }
    
    public function Movimiento(){
        return $this->hasMany(movimientos_x_activos::class,'taqActivos','taqActivos');
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
}
