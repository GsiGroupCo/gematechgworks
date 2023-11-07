<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaracteristicasXComponentesTable extends Migration
{
    public function up()
    {
        Schema::create('caracteristicas_x_componentes', function (Blueprint $table) {
            $table->string('taqotro')->unique();
            $table->string('taqComponente');
            $table->string('nombre');
            $table->string('value');
            $table->timestamps();
        });

        Schema::table('caracteristicas_x_componentes', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('caracteristicas_x_componentes');
    }
}
