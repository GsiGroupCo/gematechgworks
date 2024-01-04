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

   public function Actividades(){
      return $this->hasMany(act_x_mantenimiento::class,'taqManto', 'taqManto');
   }
   
   public function Oms(){
      return $this->hasMany(mantenimientos_x_om::class,'taqManto', 'taqManto');
   }

}
