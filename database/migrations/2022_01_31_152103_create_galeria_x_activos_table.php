<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGaleriaXActivosTable extends Migration
{

    public function up()
    {
        Schema::create('galeria_x_activos', function (Blueprint $table) {
            $table->string('id_foto')->unique();
            $table->string('taqActivos');
            $table->string('Image');
            $table->timestamps();
        });

        Schema::table('galeria_x_activos', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('activos'); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('galeria_x_activos');
    }
}
