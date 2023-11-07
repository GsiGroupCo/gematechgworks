<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCargosTable extends Migration
{
    
    public function up()
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->string('cargo_id')->unique();
            $table->string('cargo');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('cargos');
    }
}
