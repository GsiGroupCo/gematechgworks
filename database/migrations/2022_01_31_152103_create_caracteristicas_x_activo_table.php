<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaracteristicasXActivoTable extends Migration
{
    
    public function up()
    {
        Schema::create('caracteristicas_x_activo', function (Blueprint $table) {
            $table->string('taq_caracteristica')->unique();
            $table->string('taqActivos');
            $table->string('nombre');
            $table->string('value');
            $table->timestamps();
        });

        Schema::table('caracteristicas_x_activo', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('Activos');
        });
    }

    public function down()
    {
        Schema::dropIfExists('caracteristicas_x_activo');
    }
}
