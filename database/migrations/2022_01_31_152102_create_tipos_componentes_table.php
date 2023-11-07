<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposComponentesTable extends Migration
{
    
    public function up()
    {
        Schema::create('tipos_componentes', function (Blueprint $table) {
            $table->string('id_tipo')->unique();
            $table->string('nombre');
            $table->string('taq_componente_base')->unique();
            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('tipos_componentes');
    }
}
