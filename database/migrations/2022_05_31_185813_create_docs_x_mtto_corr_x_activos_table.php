<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsXMttoCorrXActivosTable extends Migration
{
    
    public function up()
    {
        Schema::create('docs_x_mtto_corr_x_activos', function (Blueprint $table) {
            $table->string('id_documento')->unique();
            $table->string('taqActivos');
            $table->string('taqmttActivo');
            $table->string('nombre');
            $table->string('DocURL');
            $table->timestamps();
        });

        Schema::table('docs_x_mtto_corr_x_activos', function (Blueprint $table) {
            $table->foreign('taqActivos')->references('taqActivos')->on('activos');
            $table->foreign('taqmttActivo')->references('taqmttActivo')->on('mtto_corr_x_activos');
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('docs_x_mtto_corr_x_activos');
    }
}
