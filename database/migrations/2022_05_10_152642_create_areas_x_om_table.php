<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreasXOmTable extends Migration
{
     
    public function up()
    {
        Schema::create('areas_x_om', function (Blueprint $table) {
            $table->id();
            $table->string('taqom');
            $table->string('taqarea');
            $table->timestamps();
        });

        Schema::table('areas_x_om', function (Blueprint $table) {
            $table->foreign('taqom')->references('taqom')->on('oms');
            $table->foreign('taqarea')->references('taqarea')->on('areas');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('areas_x_om');
    }
}
