<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOmsTable extends Migration
{

    public function up()
    {
        Schema::create('oms', function (Blueprint $table) {
            $table->string('taqom')->unique(); 
            $table->string('taqresponsable');
            $table->string('fechainicio');
            $table->string('horainicio');
            $table->string('fechafin')->nullable();
            $table->string('horafin')->nullable();
            $table->string('tipo'); 
            $table->string('descripcion',500)->nullable();
            $table->string('prioridad');
            $table->string('estado');
            $table->timestamps();
        });

        Schema::table('oms', function (Blueprint $table) {
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
        });
    }

    public function down()
    {
        Schema::dropIfExists('oms');
    }
}
