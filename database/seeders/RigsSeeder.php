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
            ],[
                'taqrig'     => 'efb288f432a6',
                'nombre'     => 'Base Gsi',  
            ]
        ]);
    }
}