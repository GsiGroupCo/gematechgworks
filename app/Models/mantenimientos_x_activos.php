<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mantenimientos_x_activos extends Model
{
    use HasFactory;

    protected $fillable = [
      'taqMantenimiento',
      'categoria_id',
      'Nombre',
      'descripcion',
      'tipe'
    ];

   public function Actividades(){
      return $this->hasMany(act_x_mantenimiento_activo::class,'taqMantenimiento', 'taqMantenimiento');
   }

   public function Actividades_Om(){
      return $this->hasMany(act_x_oma::class,'taqMantenimiento', 'taqMantenimiento');
   }

   public function Categoria_Activo(){
      return $this->belongsTo(categorias_activo::class,'categoria_id', 'categoria_id');
   }

}
