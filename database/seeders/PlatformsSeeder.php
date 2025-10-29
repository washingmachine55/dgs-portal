<?php

namespace Database\Seeders;

use App\Models\Platforms;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Platforms::factory(2)->create();
    }
}
