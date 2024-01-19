<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOmasTable extends Migration
{

    public function up()
    {
        Schema::create('omas', function (Blueprint $table) {
            $table->string('taqom')->unique(); 
            $table->string('taqresponsable');
            $table->string('taqActivos');
            $table->string('taqMantenimiento');
            $table->string('fechainicio');
            $table->string('horainicio');
            $table->string('fechafin')->nullable();
            $table->string('horafin')->nullable();
            $table->string('tipo'); 
            $table->string('prioridad');
            $table->string('estado');
            $table->string('descripcion',500)->nullable();
            $table->timestamps();
        });

        Schema::table('omas', function (Blueprint $table) {
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
            $table->foreign('taqMantenimiento')->references('taqMantenimiento')->on('mantenimientos_x_activos');
            $table->foreign('taqActivos')->references('taqActivos')->on('activos'); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('omas');
    }
}
