<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCertXComponenteTable extends Migration
{
    public function up()
    {
        Schema::create('cert_x_componente', function (Blueprint $table) {
            $table->string('taqComponente');
            $table->string('taqDoc')->unique();
            $table->string('nombre');
            $table->string('fechacertificion');
            $table->string('frecuencia');
            $table->string('estado');
            $table->string('DocURL');
            $table->timestamps();
        });
        Schema::table('cert_x_componente', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
        });
    }
    public function down()
    {
        Schema::dropIfExists('cert_x_componente');
    }
}
