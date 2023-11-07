<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaracteristicasXEmpresaTable extends Migration
{
    
    public function up()
    {
        Schema::create('caracteristicas_x_empresa', function (Blueprint $table) {
            $table->string('taqotro')->unique();
            $table->string('taqempresa');
            $table->string('nombre');
            $table->string('value');
            $table->timestamps();
        });

        Schema::table('caracteristicas_x_empresa', function (Blueprint $table) {
            $table->foreign('taqempresa')->references('taqempresa')->on('empresas');
        });
    }

    public function down()
    {
        Schema::dropIfExists('caracteristicas_x_empresa');
    }
}
