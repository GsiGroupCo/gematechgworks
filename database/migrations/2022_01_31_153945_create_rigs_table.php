<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRigsTable extends Migration
{

    public function up()
    {
        Schema::create('rigs', function (Blueprint $table) {
            $table->string('taqrig')->unique(); 
            $table->string('nombre');
            $table->string('longitud')->nullable();
            $table->string('latitud')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rigs');
    }
}
