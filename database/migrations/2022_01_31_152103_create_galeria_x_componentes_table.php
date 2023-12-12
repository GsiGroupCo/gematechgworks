<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGaleriaXComponentesTable extends Migration
{

    public function up()
    {
        Schema::create('galeria_x_componentes', function (Blueprint $table) {
            $table->string('id_foto')->unique();
            $table->string('taqComponente');
            $table->string('Image');
            $table->timestamps();
        });

        Schema::table('galeria_x_componentes', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes'); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('galeria_x_componentes');
    }
}
