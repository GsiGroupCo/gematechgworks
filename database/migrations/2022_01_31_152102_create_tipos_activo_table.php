<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposActivoTable extends Migration
{
    
    public function up()
    {
        Schema::create('tipos_activo', function (Blueprint $table) {
            $table->string('id_tipo')->unique();
            $table->string('nombre');
            $table->string('taq_activo_base')->unique();
            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('tipos_activo');
    }
}
