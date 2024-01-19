<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOmcsTable extends Migration
{

    public function up()
    {
        Schema::create('omcs', function (Blueprint $table) {
            $table->string('taqom')->unique(); 
            $table->string('taqresponsable');
            $table->string('taqComponente');
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

        Schema::table('omcs', function (Blueprint $table) {
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
            $table->foreign('taqMantenimiento')->references('taqMantenimiento')->on('mantenimientos_x_componentes');
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');

        });
    }

    public function down()
    {
        Schema::dropIfExists('omcs');
    }
}
