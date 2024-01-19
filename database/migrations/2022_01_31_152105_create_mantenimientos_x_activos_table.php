<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMantenimientosXActivosTable extends Migration
{
    public function up()
    {
        Schema::create('mantenimientos_x_activos', function (Blueprint $table) {
            $table->string('taqMantenimiento')->unique();
            $table->string('categoria_id');
            $table->string('Nombre');
            $table->string('tipe');
            $table->string('descripcion',500);
            $table->timestamps();
        });
        Schema::table('mantenimientos_x_activos', function (Blueprint $table) { 
            $table->foreign('categoria_id')->references('categoria_id')->on('categorias_activo');
        });
    }


    public function down()
    {
        Schema::dropIfExists('mantenimientos_x_activos');
    }
}