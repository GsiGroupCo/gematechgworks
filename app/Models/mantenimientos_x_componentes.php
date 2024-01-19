<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mantenimientos_x_componentes extends Model
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
      return $this->hasMany(act_x_mantenimiento_componente::class,'taqMantenimiento', 'taqMantenimiento');
   }

   public function Categoria_Componente(){
      return $this->belongsTo(categoria_componentes::class,'categoria_id', 'categoria_id');
   }

}
