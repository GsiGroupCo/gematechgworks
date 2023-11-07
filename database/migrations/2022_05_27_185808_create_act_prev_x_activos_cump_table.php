<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActPrevXActivosCumpTable extends Migration
{

    public function up()
    {
        Schema::create('act_prev_x_activos_cump', function (Blueprint $table) {
            $table->string('taqActPrevact')->unique();
            $table->string('taqmttActivo');
            $table->string('taqresponsable');
            $table->string('nombre');
            $table->string('frecuencia');
            $table->string('estado');
            $table->string('fecha');
            $table->timestamps();
        });

        Schema::table('act_prev_x_activos_cump', function (Blueprint $table) {
            $table->foreign('taqmttActivo')->references('taqmttActivo')->on('mtto_prev_x_activos');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
        });
    }

    public function down()
    {
        Schema::dropIfExists('act_prev_x_activos_cump');
    }
}
