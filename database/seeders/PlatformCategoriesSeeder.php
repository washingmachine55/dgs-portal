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
        PlatformCategories::factory(3)->create();
    }
}
