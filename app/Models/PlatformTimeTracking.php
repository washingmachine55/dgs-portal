<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
