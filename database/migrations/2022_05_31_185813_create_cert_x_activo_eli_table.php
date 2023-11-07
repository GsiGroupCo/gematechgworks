<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCertXActivoEliTable extends Migration
{
    
    public function up()
    {
        Schema::create('cert_x_activo_eli', function (Blueprint $table) {
            $table->string('taqDeleteRegister')->unique();
            $table->string('taqActivos');
            $table->string('nombreDocumento');
            $table->string('taqresponsable');
            $table->timestamps();
        });

        Schema::table('cert_x_activo_eli', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('activos');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('users');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('cert_x_activo_eli');
    }
}
