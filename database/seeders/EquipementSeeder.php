<?php

namespace Database\Seeders;

use App\Models\Equipement;
use Illuminate\Database\Seeder;

class EquipementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipements = [
            // Basic amenities
            'Wi-Fi',
            'Electricity included',
            'Water included',
            'Heating',
            'Air conditioning',
            'Washing machine',
            'Dryer',
            
            // Kitchen equipment
            'Fully equipped kitchen',
            'Oven',
            'Microwave',
            'Dishwasher',
            'Refrigerator',
            'Freezer',
            'Coffee machine',
            
            // Living space
            'Furnished',
            'TV',
            'Cable TV',
            'Netflix/Streaming',
            'Fireplace',
            
            // Bathroom
            'Private bathroom',
            'Shared bathroom',
            'Hair dryer',
            
            // Bedroom
            'Bed linens',
            'Wardrobe',
            'Desk',
            'Private balcony',
            
            // Outdoor
            'Terrace',
            'Garden',
            'BBQ',
            'Parking',
            'Bike storage',
            
            // Accessibility
            'Elevator',
            'Wheelchair accessible',
            'Pet friendly',
            
            // Security
            'Smoke detector',
            'Carbon monoxide detector',
            'Safe',
            'Security system'
        ];

        foreach ($equipements as $equipement) {
            Equipement::firstOrCreate([
                'name' => $equipement
            ]);
        }
    }
}