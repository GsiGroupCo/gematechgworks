<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActCorrXComponenteCumpTable extends Migration
{
    
    public function up()
    {
        Schema::create('act_corr_x_componente_cump', function (Blueprint $table) {
            $table->string('act_corr_comp')->unique();
            $table->string('mtto_id');
            $table->string('taqresponsable');
            $table->string('nombre');
            $table->string('estado');
            $table->string('fecha');
            $table->timestamps();
        });

        Schema::table('act_corr_x_componente_cump', function (Blueprint $table) {
            $table->foreign('mtto_id')->references('mtto_id')->on('mtto_corr_x_componentes');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('act_corr_x_componente_cump');
    }
}
