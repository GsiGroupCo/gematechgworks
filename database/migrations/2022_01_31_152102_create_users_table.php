<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('taqresponsable')->unique();
            $table->string('nombre');
            $table->string('password');
            $table->string('cargo_id');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('urlImage')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('cargo_id')->references('cargo_id')->on('cargos');
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
