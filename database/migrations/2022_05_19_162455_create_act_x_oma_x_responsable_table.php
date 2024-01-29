<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

 class CreateActXOmaXResponsableTable extends Migration
{
    
    public function up()
    {
        Schema::create('act_x_oma_x_responsable', function (Blueprint $table) {
            $table->string('id_registro_actividad')->unique();
            $table->string('actividad_id'); 
            $table->string('taqresponsable');
            $table->timestamps();
        });

        Schema::table('act_x_oma_x_responsable', function (Blueprint $table) {
            $table->foreign('actividad_id')->references('actividad_id')->on('act_x_oma');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables'); 
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_x_oma_x_responsable');
    }
}
