<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabajosTable extends Migration
{
    public function up()
    {
        Schema::create('trabajos', function (Blueprint $table) {
            $table->string('taqtrabajo')->unique();
            $table->string('taqresponsable');
            $table->string('taqom');
            $table->string('descripcion',500);
            $table->string('cantHoras');
            $table->string('estado');
            $table->timestamps();
        });

        Schema::table('trabajos', function (Blueprint $table) {
            $table->foreign('taqom')->references('taqom')->on('oms');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
        });

    }

    public function down()
    {
        Schema::dropIfExists('trabajos');
    }
}
