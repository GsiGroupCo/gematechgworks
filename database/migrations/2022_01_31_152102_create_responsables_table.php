<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResponsablesTable extends Migration
{

    public function up()
    {
        Schema::create('responsables', function (Blueprint $table) { 
            $table->string('taqresponsable')->unique();
            $table->string('cargo_id');
            $table->string('nombre');
            $table->string('estado');
            $table->string('urlImage')->nullable();
            $table->timestamps();
        });

        Schema::table('responsables', function (Blueprint $table) { 
            $table->foreign('cargo_id') -> references('cargo_id') ->on('cargos');
        });
    }

    public function down()
    {
        Schema::dropIfExists('responsables');
    }
}
