<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMttoCorrXActivosTable extends Migration
{
    
    public function up()
    {
        Schema::create('mtto_corr_x_activos', function (Blueprint $table) {
            $table->string('taqmttActivo')->unique();
            $table->string('actividad');
            $table->string('taqActivos');
            $table->string('area');
            $table->string('preoperacional');
            $table->string('taqresponsable');
            $table->string('estado');
            $table->string('fecha');
            $table->string('fechaFin')->nullable();
            $table->timestamps();
        });

        Schema::table('mtto_corr_x_activos', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('Activos');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('mtto_corr_x_activos');
    }
}
