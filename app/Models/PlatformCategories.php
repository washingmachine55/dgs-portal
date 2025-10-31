<?php

namespace App\Models;

use App\Models\Platforms;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PlatformCategories extends Model
{
    /** @use HasFactory<\Database\Factories\PlatformCategoriesFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function platforms(): HasMany
    {
        return $this->hasMany(Platforms::class);
    }

}
