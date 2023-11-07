<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXComponentesTable extends Migration
{
    public function up()
    {
        Schema::create('docs_x_componentes', function (Blueprint $table) {
            $table->string('taqComponente');
            $table->string('taqDoc')->unique();
            $table->string('nombre');
            $table->string('DocURL');
            $table->timestamps();
        });

        Schema::table('docs_x_componentes', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
        });
    }
    public function down()
    {
        Schema::dropIfExists('docs_x_componentes');
    }
}
