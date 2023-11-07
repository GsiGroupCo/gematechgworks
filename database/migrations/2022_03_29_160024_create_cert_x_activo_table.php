<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCertXActivoTable extends Migration
{

    public function up()
    {
        Schema::create('cert_x_activo', function (Blueprint $table) {
            $table->string('taqActivos');
            $table->string('taqDoc')->unique();
            $table->string('nombre');
            $table->string('fechacertificion');
            $table->string('frecuencia');
            $table->string('estado');
            $table->string('DocURL');
            $table->timestamps();
        });

        Schema::table('cert_x_activo', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('Activos');
        });
    }
    public function down()
    {
        Schema::dropIfExists('cert_x_activo');
    }
}
