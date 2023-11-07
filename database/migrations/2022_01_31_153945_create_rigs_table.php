<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRigsTable extends Migration
{

    public function up()
    {
        Schema::create('rigs', function (Blueprint $table) {
            $table->string('taqrig')->unique(); 
            $table->string('taqempresa');
            $table->string('nombre');
            $table->string('longitud');
            $table->string('latitud');
            $table->timestamps();
        });

        Schema::table('rigs', function (Blueprint $table) { 
            $table->foreign('taqempresa')->references('taqempresa')->on('empresas');
        });
    }

    public function down()
    {
        Schema::dropIfExists('rigs');
    }
}
