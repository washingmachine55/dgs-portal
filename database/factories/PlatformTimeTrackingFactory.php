<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlatformTimeTracking>
 */
class PlatformTimeTrackingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $platformId = \App\Models\Platforms::all()->random()->id;
        // $gamesId = \App\Models\Games::all()->random()->id;

        return [
            // 'platform_id' => $platformId,
            // 'date' => $this->faker->date(),
            // 'games_id' => $gamesId ? $gamesId : null,
            // 'start_time' => $this->faker->time(),
            // 'end_time' => $this->faker->boolean(70) ? $this->faker->time() : null,
        ];
    }
}
