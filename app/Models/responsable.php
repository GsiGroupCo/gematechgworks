<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class responsable extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'taqresponsable',
        'nombre',
        'cargo_id',
        'estado',
        'urlImage',
    ];
 

    public function Cargo(){
      return $this->belongsTo(cargos::class, 'cargo_id', 'cargo_id');
    }

    public function Trabajo(){
       return $this->hasMany(Trabajo::class, 'taqresponsable', 'taqresponsable');
    }

     public function Om(){
        return $this->hasMany(om::class, 'taqresponsable', 'taqresponsable');
     }

     public function Documentos(){
      return $this->hasMany(docs_x_responsables::class, 'taqresponsable', 'taqresponsable');
     }
     
     public function DocumentosEliminados(){
      return $this->hasMany(docs_x_responsables_eli::class, 'taqresponsable', 'taqresponsable');
     }

     public function Movimiento_Activo(){
        return $this->hasMany(movimientos_x_activos::class, 'taqresponsable', 'taqresponsable');
     }

    public function Movimiento_Herramienta(){
        return $this->hasMany(movimientos_x_herramientas::class, 'taqresponsable', 'taqresponsable');
     }

     public function Mantenimiento_Correctivo_Activos(){
      return $this->hasMany(mtto_corr_x_activos::class, 'taqresponsable', 'taqresponsable');
     } 

     public function Mantenimiento_Preventivos_Activos(){
      return $this->hasMany(mtto_prev_x_activos::class, 'taqresponsable', 'taqresponsable');
     }

     public function Actividades_Correctivas_Pendientes_Activos(){
        return $this->hasMany(act_corr_x_activo::class, 'taqresponsable', 'taqresponsable');
     }

     public function Actividades_Correctivas_Finalizadas_Activos(){
      return $this->hasMany(act_corr_x_activo_cump::class, 'taqresponsable', 'taqresponsable');
   }
}
