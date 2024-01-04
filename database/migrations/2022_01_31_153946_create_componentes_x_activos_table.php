<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentesXActivosTable extends Migration
{
    public function up()
    {
        Schema::create('componentes_x_activos', function (Blueprint $table) {
            $table->string('taq_historial')->unique();
            $table->string('taqComponente');
            $table->string('taqActivos');
            $table->string('estado');
            $table->string('fecha_acople');
            $table->string('fecha_desacople')->nullable();
            $table->timestamps();
        });

        Schema::table('componentes_x_activos', function (Blueprint $table) {
            $table->foreign('taqActivos')    -> references('taqActivos')    -> on('Activos');
            $table->foreign('taqComponente') -> references('taqComponente') -> on('Componentes');
        });
    }

    public function down()
    {
        Schema::dropIfExists('componentes_x_activos');
    }
}
