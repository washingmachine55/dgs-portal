<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class PlatformTimeTracking extends Model
{
    /** @use HasFactory<\Database\Factories\PlatformTimeTrackingFactory> */
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'platform_time_tracking';

    protected $fillable = [
        'platform_id',
        'date',
        'games_id',
        'start_time',
        'end_time',
    ];

    public function platform(): BelongsTo {
        return $this->belongsTo(Platforms::class);
    }
}
