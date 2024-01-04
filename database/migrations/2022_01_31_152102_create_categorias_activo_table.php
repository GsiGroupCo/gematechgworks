<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriasActivoTable extends Migration
{
    
    public function up()
    {
        Schema::create('categorias_activo', function (Blueprint $table) {
            $table->string('categoria_id')->unique();
            $table->string('nombre');
            $table->string('taq')->unique();
            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('categorias_activo');
    }
}
