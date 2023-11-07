<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentesTable extends Migration
{

    public function up()
    {
        Schema::create('componentes', function (Blueprint $table) {
            $table->string('taqComponente') -> unique(); 
            $table->string('id_tipo');
            $table->string('nombre');
            $table->string('descripcion',500) -> nullable();
            $table->string('serial')   -> nullable();
            $table->string('horasuso') -> nullable();
            $table->string('urlImage') -> nullable();
            $table->timestamps();
        });

        Schema::table('componentes', function (Blueprint $table) { 
            $table->foreign('id_tipo')->references('id_tipo')->on('tipos_componentes');
        });
    }

    public function down()
    {
        Schema::dropIfExists('componentes');
    }
}
