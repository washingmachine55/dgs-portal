<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PlatformCategories;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Platforms>
 */
class PlatformsFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $platformCategoriesId = \App\Models\PlatformCategories::all()->random()->id;

        return [
            'platform_categories_id' => $platformCategoriesId,
            'name' => $this->faker->unique()->word(),
            'manufacturer' => $this->faker->word(),
        ];
    }
}
