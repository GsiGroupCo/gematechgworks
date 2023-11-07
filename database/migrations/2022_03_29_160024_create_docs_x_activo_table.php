<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXActivoTable extends Migration
{
    public function up()
    {
        Schema::create('docs_x_activo', function (Blueprint $table) {
            $table->string('taqActivos');
            $table->string('taqDoc')->unique();
            $table->string('nombre');
            $table->string('DocURL');
            $table->timestamps();
        });

        Schema::table('docs_x_activo', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('Activos');
        });
    }
    public function down()
    {
        Schema::dropIfExists('docs_x_activo');
    }
}
