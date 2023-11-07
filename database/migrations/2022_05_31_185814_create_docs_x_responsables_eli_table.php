<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXResponsablesEliTable extends Migration
{
    public function up()
    {
        Schema::create('docs_x_responsables_eli', function (Blueprint $table) {
            $table->string('documento_eliminado_id')->unique();
            $table->string('documento_id');
            $table->string('taqresponsable');
            $table->string('nombre');
            $table->string('url');
            $table->timestamps();
        });

        Schema::table('docs_x_responsables_eli', function (Blueprint $table) {
            $table->foreign('documento_id')->references('documento_id')->on('docs_x_responsables');
            $table->foreign('taqresponsable')->references('taqresponsable')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('docs_x_responsables_eli');
    }
}
