<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateMttoPrevXComponentesTable extends Migration
{
    
    public function up()
    {
        Schema::create('mtto_prev_x_componentes', function (Blueprint $table) {
            $table->string('mtto_id')->unique();
            $table->string('taqManto');
            $table->string('actividad');
            $table->string('taqComponente');
            $table->string('taqresponsable');
            $table->string('area');
            $table->string('cantDocs');
            $table->string('estado');
            $table->string('fecha');
            $table->string('fechaFin')->nullable();
            $table->timestamps();
        });

        Schema::table('mtto_prev_x_componentes', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
            $table->foreign('taqManto')->references('taqManto')->on('mantenimientos');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('mtto_prev_x_componentes');
    }
}
