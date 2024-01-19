<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXOmaTable extends Migration
{
    
    public function up()
    {
        Schema::create('docs_x_oma', function (Blueprint $table) {
            $table->string('taqom');
            $table->string('taqDoc')->unique();
            $table->string('nombre');
            $table->string('DocURL');
            $table->timestamps();
        });

        Schema::table('docs_x_oma', function (Blueprint $table) {
            $table->foreign('taqom')->references('taqom')->on('omas');
        });
    }

    public function down()
    {
        Schema::dropIfExists('docs_x_oma');
    }
}
