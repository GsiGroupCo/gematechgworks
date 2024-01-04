<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriaComponentesTable extends Migration
{
    
    public function up()
    {
        Schema::create('categoria_componentes', function (Blueprint $table) {
            $table->string('categoria_id')->unique();
            $table->string('nombre');
            $table->string('taq')->unique();
            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('categoria_componentes');
    }
}
