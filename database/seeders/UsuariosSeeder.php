<?php

namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'taqresponsable' => '56e6e4262cac',
                'cargo_id'       => '15ee9f208e349',
                'nombre'         => 'Joan Sebastian Giraldo Morales',
                'email'          => 'sebastiangiraldo3@gmail.com',
                'password'       => '$2y$10$fTI/ghJdDjUqy5OCA4oOg.F7LopnHOflN.DBh8M9Aov1naEBsHnS6'
            ],[
                'taqresponsable' => '05eeec9d8b9e',
                'cargo_id'       => '15ees9f208e349',
                'nombre'         => 'Omar Lizandro Meza Landinez',
                'email'          => 'coordinador.mto@groupgsi.com',
                'password'       => '$2y$10$ojwrm2J0GziWdIYApsVVoOFcyu30zi9KVPbRZaLemlMAew/yHu4vC' 
            ]
        ]);
    }
}