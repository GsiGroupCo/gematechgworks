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
            $table->string('taqComponente');
            $table->string('nombre');
            $table->string('sistema');
            $table->string('frecuencia');
            $table->string('tipofrecuencia');
            $table->string('taqmantenimiento');
            $table->timestamps();
        });

        Schema::table('act_x_mantenimiento', function (Blueprint $table) {
            $table->foreign('taqmantenimiento')->references('taqmantenimiento')->on('mantenimientos_x_oms');
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_x_mantenimiento');
    }
}
