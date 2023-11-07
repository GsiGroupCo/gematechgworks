<?php

namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cargos')->insert([
            [ 
                'cargo_id'    => '15ee9f208e349',
                'cargo'       => 'INGENIERO DE SISTEMAS',
                'descripcion' => 'DISEÑAR Y PROGRAMAR'
            ],
            [ 
                'cargo_id'    => '15ees9f208e349',
                'cargo'       => 'COORDINADOR DE MANTENIMIENTO',
                'descripcion' => 'RESPONSABLE DEL LOS PROCESOS Y LA INFORMACION SUMINISTRADA'
            ],
        ]);
    }
}