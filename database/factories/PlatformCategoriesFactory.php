<?php

namespace Database\Factories;

use App\Models\PlatformCategories;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlatformCategories>
 */
class PlatformCategoriesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $platformCategories = [
        //     ['name' => 'PS5'],
        //     ['name' => 'Xbox'],
        //     ['name' => 'Racing Simulator'],
        //     ['name' => 'Gaming PC - 122Hz'],
        //     ['name' => 'Gaming PC - 200Hz'],
        // ];

        // foreach ($platformCategories as $platformCategory) {
        //     PlatformCategories::factory()->create($platformCategory);
        // }

        return [
            // 'name' => fake()->name(),
            // 'name' => array_rand($platformCategories),
        ];
    }
}
