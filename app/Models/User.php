<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'taqresponsable',
        'nombre',
        'password',
        'cargo_id',
        'email',
        'urlImage'
    ];

    public function Cargo(){
        return $this->hasMany(cargos::class, 'cargo_id', 'cargo_id');
    }

    public function DocumentoActivoEliminados(){
        return $this->hasMany(docs_x_activo_eli::class, 'taqresponsable', 'taqresponsable');
    }

    public function CertificacionActivoEliminados(){
        return $this->hasMany(cert_x_activo_eli::class, 'taqresponsable', 'taqresponsable');
    }

    public function DocumentosOmsEliminados(){
        return $this->hasMany(docs_x_om_eli::class, 'taqresponsable', 'taqresponsable');
    }
    
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
