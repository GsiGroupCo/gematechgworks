<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActXOmaTable extends Migration
{
    
    public function up()
    {
        Schema::create('act_x_oma', function (Blueprint $table) {
            $table->string('actividad_id')->unique();
            $table->string('taqom');
            $table->string('taqMantenimiento'); 
            $table->string('nombre');
            $table->string('descripcion');
            $table->string('estado'); 
            $table->timestamps();
        });

        Schema::table('act_x_oma', function (Blueprint $table) {
            $table->foreign('taqom')->references('taqom')->on('omas'); 
            $table->foreign('taqMantenimiento')->references('taqMantenimiento')->on('mantenimientos_x_activos');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_x_oma');
    }
}
