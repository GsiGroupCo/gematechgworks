<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXComponentesEliTable extends Migration
{
    
    public function up()
    {
        Schema::create('docs_x_componentes_eli', function (Blueprint $table) {
            $table->string('taqDeleteRegister')->unique();
            $table->string('taqComponente');
            $table->string('nombreDocumento');
            $table->string('taqresponsable');
            $table->timestamps();
        });

        Schema::table('docs_x_componentes_eli', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('users');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('docs_x_componentes_eli');
    }
}
