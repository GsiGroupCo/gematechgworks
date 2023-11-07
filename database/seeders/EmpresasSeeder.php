<?php

namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

class EmpresasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('empresas')->insert([
            [
                'taqempresa' => '56e6e4262cac', 
                'nombre'     => 'Gworks Services', 
                'urlImage'   => '56e6e4262cac/LogoGworks.png'
            ],[
                'taqempresa' => '05eeec9d8b9e', 
                'nombre'     => 'Gsi group', 
                'urlImage'   => '56e6e4262cac/LogoGsi.png'
            ]
        ]);
    }
}