<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            ['id' => Str::uuid(), 'name' => 'Tanger-Tétouan-Al Hoceïma', 'code' => 'MA-01'],
            ['id' => Str::uuid(), 'name' => "L'Oriental", 'code' => 'MA-02'],
            ['id' => Str::uuid(), 'name' => 'Fès-Meknès', 'code' => 'MA-03'],
            ['id' => Str::uuid(), 'name' => 'Rabat-Salé-Kénitra', 'code' => 'MA-04'],
            ['id' => Str::uuid(), 'name' => 'Béni Mellal-Khénifra', 'code' => 'MA-05'],
            ['id' => Str::uuid(), 'name' => 'Casablanca-Settat', 'code' => 'MA-06'],
            ['id' => Str::uuid(), 'name' => 'Marrakech-Safi', 'code' => 'MA-07'],
            ['id' => Str::uuid(), 'name' => 'Drâa-Tafilalet', 'code' => 'MA-08'],
            ['id' => Str::uuid(), 'name' => 'Souss-Massa', 'code' => 'MA-09'],
            ['id' => Str::uuid(), 'name' => 'Guelmim-Oued Noun', 'code' => 'MA-10'],
            ['id' => Str::uuid(), 'name' => 'Laâyoune-Sakia El Hamra', 'code' => 'MA-11'],
            ['id' => Str::uuid(), 'name' => 'Dakhla-Oued Ed Dahab', 'code' => 'MA-12'],
        ];

        foreach ($regions as $region) {
            Region::create($region);
        }
    }
}