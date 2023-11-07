<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXResponsablesTable extends Migration
{
    public function up()
    {
        Schema::create('docs_x_responsables', function (Blueprint $table) {
            $table->string('documento_id')->unique();
            $table->string('taqresponsable');
            $table->string('nombre');
            $table->string('url');
            $table->timestamps();
        });

        Schema::table('docs_x_responsables', function (Blueprint $table) {
            $table->foreign('taqresponsable')->references('taqresponsable')->on('responsables');
        });
    }

    public function down()
    {
        Schema::dropIfExists('docs_x_responsables');
    }
}
