<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\PlatformCategories;
use Illuminate\Database\Seeder;

class PlatformCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $platformCategories = [
            ['name' => 'PS5'],
            ['name' => 'Xbox'],
            ['name' => 'Racing Simulator'],
            ['name' => 'Gaming PC - 122Hz'],
            ['name' => 'Gaming PC - 200Hz'],
        ];

        foreach ($platformCategories as $platformCategory) {
            PlatformCategories::factory()->create($platformCategory);
        }

        // PlatformCategories::factory(3)->create();
    }
}
