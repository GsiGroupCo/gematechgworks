<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mantenimientos extends Model
{
    use HasFactory;

    protected $fillable = [
        'taqManto',
        'nombre',
        'descripcion',
        'tipe',
    ];

   public function Mantenimiento_Correctivos_Activos(){
      return $this->hasMany(mtto_corr_x_activos::class,'taqManto', 'taqManto');
   }

   public function Mantenimiento_Correctivos_Herramientas(){
      return $this->hasMany(mtto_corr_x_herramientas::class,'taqManto', 'taqManto');
   }

   public function Mantenimiento_Correctivos_Componentes(){
      return $this->hasMany(mtto_corr_x_componentes::class,'taqManto', 'taqManto');
   }

   public function Mantenimiento_Preventivos_Activos(){
      return $this->hasMany(mtto_prev_x_activos::class,'taqManto', 'taqManto');
   }

   public function Mantenimiento_Preventivos_Herramientas(){
      return $this->hasMany(mtto_prev_x_herramienta::class,'taqManto', 'taqManto');
   }

   public function Mantenimiento_Preventivos_Componentes(){
      return $this->hasMany(mtto_prev_x_componentes::class,'taqManto', 'taqManto');
   }

   public function Mantenimiento_Horas_Activos(){
      return $this->hasMany(mtto_horas_x_activos::class,'taqManto', 'taqManto');
   }

   public function Mantenimiento_Horas_Componentes(){
      return $this->hasMany(mtto_horas_x_componentes::class,'taqManto', 'taqManto');
   }

   public function Actividades(){
      return $this->hasMany(act_x_mantenimiento::class,'taqManto', 'taqManto');
   }
}
