<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Platforms extends Model
{
    /** @use HasFactory<\Database\Factories\PlatformsFactory> */
    use HasFactory;

    protected $fillable = [
        'platform_categories_id',
        'name',
        'manufacturer',
    ];

    public function category(): BelongsTo {
        // return $this->belongsTo(PlatformCategories::class, 'platform_categories_id', 'id');
        return $this->belongsTo(PlatformCategories::class);
    }
}
