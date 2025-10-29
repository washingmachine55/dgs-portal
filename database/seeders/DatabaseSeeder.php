<?php

namespace Database\Seeders;

use App\Models\PlatformTimeTracking;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            PlatformCategoriesSeeder::class,
            GamesSeeder::class,
            PlatformsSeeder::class,
            PlatformTimeTrackingSeeder::class,
        ]);
    }
}
