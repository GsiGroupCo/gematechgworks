<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreaTable extends Migration
{
    
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->string('taqarea')->unique();
            $table->string('nombre');
        });
        
    }

   
    public function down()
    {
        Schema::dropIfExists('areas');
    }
}
