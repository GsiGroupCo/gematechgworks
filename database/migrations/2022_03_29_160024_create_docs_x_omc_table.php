<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXOmcTable extends Migration
{
    
    public function up()
    {
        Schema::create('docs_x_omc', function (Blueprint $table) {
            $table->string('taqom');
            $table->string('taqDoc')->unique();
            $table->string('nombre');
            $table->string('DocURL');
            $table->timestamps();
        });

        Schema::table('docs_x_omc', function (Blueprint $table) {
            $table->foreign('taqom')->references('taqom')->on('omcs');
        });
    }

    public function down()
    {
        Schema::dropIfExists('docs_x_omc');
    }
}
