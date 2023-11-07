<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXMttoPrevXComponentesTable extends Migration
{
    
    public function up()
    {
        Schema::create('docs_x_mtto_prev_x_componentes', function (Blueprint $table) {
            $table->string('doc_mtto_comt') -> unique();
            $table->string('taqComponente');
            $table->string('mtto_id');
            $table->string('nombre');
            $table->string('DocURL');
            $table->timestamps();
        });

        Schema::table('docs_x_mtto_prev_x_componentes', function (Blueprint $table) {
            $table->foreign('taqComponente')->references('taqComponente')->on('componentes');
            $table->foreign('mtto_id')->references('mtto_id')->on('mtto_prev_x_componentes');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('docs_x_mtto_prev_x_componentes');
    }
}
