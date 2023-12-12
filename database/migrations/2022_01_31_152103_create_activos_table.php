<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivosTable extends Migration
{

    public function up()
    {
        Schema::create('activos', function (Blueprint $table) {
            $table->string('taqActivos')->unique(); 
            $table->string('id_tipo');
            $table->string('nombre');
            $table->string('descripcion',500)->nullable();
            $table->string('serial')->nullable();
            $table->string('horasuso')->nullable();
            $table->string('estado');
            $table->string('urlImage')->nullable();
            $table->timestamps();
        });

        Schema::table('activos', function (Blueprint $table) { 
            $table->foreign('id_tipo')->references('id_tipo')->on('tipos_activo');
        });
    }

    public function down()
    {
        Schema::dropIfExists('activos');
    }
}
