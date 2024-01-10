<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovimientosXActivosTable extends Migration
{
    public function up()
    { 
        Schema::create('movimientos_x_activos', function (Blueprint $table) {
            $table->string('taq_movimiento')->unique();
            $table->string('taqrig');
            $table->string('taqActivos');
            $table->string('fechaSalida');
            $table->string('fechaRetorno');
            $table->string('estado');
            $table->string('descripcion',500)->nullable();
            $table->timestamps();
        });

        Schema::table('movimientos_x_activos', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('Activos');
            $table->foreign('taqrig')->references('taqrig')->on('rigs');
        });
    }
    public function down()
    {
        Schema::dropIfExists('movimientos_x_activos');
    }
}
