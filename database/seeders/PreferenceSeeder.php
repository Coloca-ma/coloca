<?php

namespace Database\Seeders;

use App\Models\Preference;
use Illuminate\Database\Seeder;

class PreferenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $preferences = [
            [
                'name' => 'Lifestyle',
                'options' => [
                    'Non-smoking',
                    'Vegetarian/Vegan household',
                    'Pet-friendly',
                    'Quiet environment',
                    'Social/Party-friendly',
                    'Alcohol-free',
                ]
            ],
            [
                'name' => 'Age Group',
                'options' => [
                    '18-25',
                    '26-35', 
                    '36-45',
                    '46+',
                    'No preference'
                ]
            ],
            [
                'name' => 'Gender Preference',
                'options' => [
                    'Female only',
                    'Male only',
                    'Mixed gender',
                    'No preference'
                ]
            ],
            [
                'name' => 'Cleaning Schedule',
                'options' => [
                    'Daily cleaning',
                    'Weekly cleaning',
                    'Bi-weekly cleaning',
                    'Monthly cleaning',
                    'Rotation system',
                    'Professional cleaning'
                ]
            ],
            [
                'name' => 'Guest Policy',
                'options' => [
                    'No overnight guests',
                    'Occasional guests OK',
                    'Guests with notice',
                    'No restrictions'
                ]
            ],
            [
                'name' => 'Occupation',
                'options' => [
                    'Student',
                    'Working professional',
                    'Remote worker',
                    'Freelancer',
                    'Mixed',
                    'No preference'
                ]
            ],
            [
                'name' => 'Sleep Schedule',
                'options' => [
                    'Early riser (before 7am)',
                    'Standard (7am-9am)',
                    'Night owl',
                    'Irregular schedule',
                    'No preference'
                ]
            ],
            [
                'name' => 'Food Sharing',
                'options' => [
                    'Shared groceries',
                    'Separate groceries',
                    'Shared staples only',
                    'Occasional sharing'
                ]
            ]
        ];

        foreach ($preferences as $preference) {
            $createdPreference = Preference::create([
                'name' => $preference['name']
            ]);

            foreach ($preference['options'] as $option) {
                $createdPreference->preferenceValues()->create([
                    'value' => $option
                ]);
            }
        }
    }
}