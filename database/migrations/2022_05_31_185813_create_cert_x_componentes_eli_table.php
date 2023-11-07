<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCertXComponentesEliTable extends Migration
{
    
    public function up()
    {
        Schema::create('cert_x_componentes_eli', function (Blueprint $table) {
            $table->string('delete_id')->unique();
            $table->string('taqComponente');
            $table->string('nombreDocumento');
            $table->string('taqresponsable');
            $table->timestamps();
        });

        Schema::table('cert_x_componentes_eli', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('users');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('cert_x_componentes_eli');
    }
}
