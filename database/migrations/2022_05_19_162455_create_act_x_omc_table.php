<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActXOmcTable extends Migration
{
    
    public function up()
    {
        Schema::create('act_x_omc', function (Blueprint $table) {
            $table->string('actividad_id')->unique();
            $table->string('taqom');
            $table->string('taqMantenimiento'); 
            $table->string('nombre');
            $table->string('descripcion');
            $table->string('estado');
            $table->timestamps();
        });

        Schema::table('act_x_omc', function (Blueprint $table) {
            $table->foreign('taqom')->references('taqom')->on('omcs');
            $table->foreign('taqMantenimiento')->references('taqMantenimiento')->on('mantenimientos_x_componentes'); 
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_x_omc');
    }
}
