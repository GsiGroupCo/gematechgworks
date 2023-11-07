<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActCorrXActivoTable extends Migration
{
    
    public function up()
    {
        Schema::create('act_corr_x_activo', function (Blueprint $table) {
            $table->string('taqActCorrAct')->unique();
            $table->string('taqmttActivo');
            $table->string('taqresponsable');
            $table->string('nombre');
            $table->string('estado');
            $table->string('fecha');
            $table->string('fechaFin')->nullable();
            $table->timestamps();
        });

        Schema::table('act_corr_x_activo', function (Blueprint $table) {
            $table->foreign('taqmttActivo')->references('taqmttActivo')->on('mtto_corr_x_activos');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_corr_x_activo');
    }
}
