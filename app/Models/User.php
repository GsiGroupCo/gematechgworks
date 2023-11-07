<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'primernombre',
        'segundonombre',
        'primerapellido',
        'segundoapellido',
        'email',
        'password',
        'taqresponsable',
        'nombre',
        'cargo_id',
        'urlImage',
    ];

    public function Cargo(){
        return $this->hasMany(cargos::class, 'cargo_id', 'cargo_id');
    }

    public function delete_document(){
        return $this->hasMany(documentos_x_activo_eliminados::class, 'taqresponsable', 'taqresponsable');
    }

    public function certificacionesDelete(){
        return $this->hasMany(certificaciones_x_activo_eliminadas::class, 'taqresponsable', 'taqresponsable');
    }

    public function Documentos_Eliminados_OT(){
        return $this->hasMany(documentos_x_ot_eliminados::class, 'taqresponsable', 'taqresponsable');
    }
    
    public function documentosHerramientasDeletes(){
        return $this->hasMany(documentosHerramientasDeletes::class, 'taqresponsable', 'taqresponsable');
    }

    public function delete_document_mtto(){
        return $this->hasMany(doc_x_mtto_x_activos_eliminados::class, 'taqresponsable', 'taqresponsable');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
