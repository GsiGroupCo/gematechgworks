<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

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

   public function Om(){
      return $this->hasMany(om::class, 'taqresponsable', 'taqresponsable');
   }

   public function Documentos(){
      return $this->hasMany(docs_x_responsables::class, 'taqresponsable', 'taqresponsable');
   }
     
   public function DocumentosEliminados(){
      return $this->hasMany(docs_x_responsables_eli::class, 'taqresponsable', 'taqresponsable');
   }
}
