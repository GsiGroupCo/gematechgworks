<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateMttoPrevXActivosTable extends Migration
{
    
    public function up()
    {
        Schema::create('mtto_prev_x_activos', function (Blueprint $table) {
            $table->string('taqmttActivo')->unique();
            $table->string('taqManto');
            $table->string('actividad');
            $table->string('taqActivos');
            $table->string('taqresponsable');
            $table->string('area');
            $table->string('cantDocs');
            $table->string('estado');
            $table->string('fecha');
            $table->string('fechaFin')->nullable();
            $table->timestamps();
        });

        Schema::table('mtto_prev_x_activos', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('Activos');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
            $table->foreign('taqManto')->references('taqManto')->on('mantenimientos');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('mtto_prev_x_activos');
    }
}
