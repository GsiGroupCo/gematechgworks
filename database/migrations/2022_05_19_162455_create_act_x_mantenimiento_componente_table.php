<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActXMantenimientoComponenteTable extends Migration
{
    
    public function up()
    {
        Schema::create('act_x_mantenimiento_componente', function (Blueprint $table) {
            $table->string('actividad_id')->unique();
            $table->string('taqMantenimiento');
            $table->string('nombre');
            $table->string('descripcion');
            $table->string('sistema');
            $table->string('frecuencia');
            $table->string('tipofrecuencia');
            $table->timestamps();   
        });

        Schema::table('act_x_mantenimiento_componente', function (Blueprint $table) {
            $table->foreign('taqMantenimiento')->references('taqMantenimiento')->on('mantenimientos_x_componentes'); 
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_x_mantenimiento_componente');
    }
}
