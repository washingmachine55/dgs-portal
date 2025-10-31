<?php

namespace Database\Seeders;

use App\Models\Games;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GamesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gamelist = [
            ['name' => 'Apex Legends', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Assassin\'s Creed Valhalla', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Atomic Heart', 'genre' => 'Shooter', 'multiplayer_only' => false],
            ['name' => 'Back 4 Blood', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Battlefield 2042', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'BioShock Infinite', 'genre' => 'Shooter', 'multiplayer_only' => false],
            ['name' => 'Call of Duty: Modern Warfare II', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Cyberpunk 2077', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Dark Souls III', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Days Gone', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Dead by Daylight', 'genre' => 'Horror', 'multiplayer_only' => true],
            ['name' => 'Death Stranding', 'genre' => 'Adventure', 'multiplayer_only' => false],
            ['name' => 'Destiny 2', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Diablo IV', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Doom Eternal', 'genre' => 'Shooter', 'multiplayer_only' => false],
            ['name' => 'Dragon Age: Inquisition', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Dying Light 2', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Elden Ring', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Far Cry 6', 'genre' => 'Shooter', 'multiplayer_only' => false],
            ['name' => 'FIFA 23', 'genre' => 'Sports', 'multiplayer_only' => false],
            ['name' => 'Final Fantasy VII Remake', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'For Honor', 'genre' => 'Action', 'multiplayer_only' => true],
            ['name' => 'Forza Horizon 5', 'genre' => 'Racing', 'multiplayer_only' => false],
            ['name' => 'Fortnite', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Ghost of Tsushima', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'God of War', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Gotham Knights', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Gran Turismo 7', 'genre' => 'Racing', 'multiplayer_only' => false],
            ['name' => 'Grand Theft Auto V', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Halo Infinite', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Horizon Forbidden West', 'genre' => 'Adventure', 'multiplayer_only' => false],
            ['name' => 'It Takes Two', 'genre' => 'Puzzle', 'multiplayer_only' => true],
            ['name' => 'Marvel\'s Spider-Man', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Mass Effect: Legendary Edition', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Metro Exodus', 'genre' => 'Shooter', 'multiplayer_only' => false],
            ['name' => 'Monster Hunter: World', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Mortal Kombat 11', 'genre' => 'Fighting', 'multiplayer_only' => false],
            ['name' => 'No Man\'s Sky', 'genre' => 'Adventure', 'multiplayer_only' => false],
            ['name' => 'Overwatch 2', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Red Dead Redemption 2', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Resident Evil 4', 'genre' => 'Horror', 'multiplayer_only' => false],
            ['name' => 'Rocket League', 'genre' => 'Sports', 'multiplayer_only' => true],
            ['name' => 'Sea of Thieves', 'genre' => 'Adventure', 'multiplayer_only' => true],
            ['name' => 'Sekiro: Shadows Die Twice', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'Starfield', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Street Fighter 6', 'genre' => 'Fighting', 'multiplayer_only' => false],
            ['name' => 'The Division 2', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'The Last of Us Part II', 'genre' => 'Action', 'multiplayer_only' => false],
            ['name' => 'The Witcher 3: Wild Hunt', 'genre' => 'RPG', 'multiplayer_only' => false],
            ['name' => 'Valorant', 'genre' => 'Shooter', 'multiplayer_only' => true],
            ['name' => 'Warframe', 'genre' => 'Shooter', 'multiplayer_only' => true]
        ];

        foreach ($gamelist as $game) {
            Games::factory()->create($game);
        }

        // Games::factory(3)->create();
    }
}
