<?php

namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

class RigsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rigs')->insert([
            [
                'taqrig'     => '93b321722848',
                'nombre'     => 'Base Gworks',
                'longitud'   => '7.016562567249996', 
                'latitud'    => '-73.8075242739638' 
            ],[
                'taqrig'     => 'efb288f432a6',
                'nombre'     => 'Base Gsi', 
                'longitud'   => '7.016562567249996', 
                'latitud'    => '-73.8075242739638' 
            ]
        ]);
    }
}