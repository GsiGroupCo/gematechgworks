<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mantenimientos_x_om extends Model
{
    use HasFactory;

    protected $fillable = [
      'taqmantenimiento',
      'taqom',
      'Nombre',
      'Descripcion',
      'tipe'
    ];

   public function Actividades(){
      return $this->belongsTo(act_x_mantenimiento::class,'taqmantenimiento', 'taqmantenimiento');
   }

   public function Om(){
      return $this->belongsTo(om::class,'taqom', 'taqom');
   }

}
