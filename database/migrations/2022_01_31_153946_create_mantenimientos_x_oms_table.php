<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMantenimientosXOmsTable extends Migration
{
    public function up()
    {
        Schema::create('mantenimientos_x_oms', function (Blueprint $table) {
            $table->string('taqmantenimiento')->unique();
            $table->string('taqom');
            $table->string('Nombre');
            $table->string('Descripcion');
            $table->string('tipe');
            $table->timestamps();
        });
        Schema::table('mantenimientos_x_oms', function (Blueprint $table) { 
            $table->foreign('taqom')->references('taqom')->on('oms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('mantenimientos_x_oms');
    }
}
