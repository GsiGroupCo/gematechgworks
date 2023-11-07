<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivosXOmTable extends Migration
{
    public function up()
    {
        Schema::create('activos_x_om', function (Blueprint $table) {
            $table->string('taqregisterActOt')->unique();
            $table->string('taqom');
            $table->string('taqActivos');
            $table->timestamps();
        });

        Schema::table('activos_x_om', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('Activos');
            $table->foreign('taqom')->references('taqom')->on('oms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('activos_x_om');
    }
}
