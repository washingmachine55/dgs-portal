<?php

namespace Database\Seeders;

use App\Models\PlatformTimeTracking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformTimeTrackingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PlatformTimeTracking::factory(10)->create();
    }
}
