<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id' => Str::uuid(),
            'first_name' => 'Youssef' ,
            'last_name' => 'Bendahmad',
            'phone' => '0600000001',
            'role' => 'admin',
            'email' => 'youssef@gmail.com',
            'password' => Hash::make('youssef123'),
        ]);

        User::create([
            'id' => Str::uuid(),
            'first_name' => 'Marouane',
            'last_name' => 'Elaarabi',
            'phone' => '0600000002',
            'role' => 'admin',
            'email' => 'marouane@gmail.com',
            'password' => Hash::make('marouane123'),
        ]);

        User::create([
            'id' => Str::uuid(),
            'first_name' => 'Youssef',
            'last_name' => 'Proprietaire',
            'phone' => '0600000003',
            'role' => 'proprietaire',
            'email' => 'youssef.proprietaire@gmail.com',
            'password' => Hash::make('youssef123'),
        ]);

        User::create([
            'id' => Str::uuid(),
            'first_name' => 'Marouane',
            'last_name' => 'Proprietaire',
            'phone' => '0600000004',
            'role' => 'proprietaire',
            'email' => 'marouane.proprietaire@gmail.com',
            'password' => Hash::make('marouane123'),
        ]);
    }
}
