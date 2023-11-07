<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActXMantenimientoTable extends Migration
{
    
    public function up()
    {
        Schema::create('act_x_mantenimiento', function (Blueprint $table) {
            $table->string('actividad_id')->unique();
            $table->string('nombre');
            $table->string('sistema');
            $table->string('componente');
            $table->string('frecuencia');
            $table->string('tipofrecuencia');
            $table->string('taqManto');
            $table->timestamps();
        });

        Schema::table('act_x_mantenimiento', function (Blueprint $table) {
            $table->foreign('taqManto')->references('taqManto')->on('mantenimientos');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_x_mantenimiento');
    }
}
