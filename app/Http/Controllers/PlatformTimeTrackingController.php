<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Games;
use App\Models\Platforms;
use App\Models\PlatformCategories;
use Illuminate\Support\Facades\DB;
use App\Models\PlatformTimeTracking;
use App\Http\Requests\StorePlatformTimeTrackingRequest;
use App\Http\Requests\CreatePlatformTimeTrackingRequest;
use App\Http\Requests\UpdatePlatformTimeTrackingRequest;
use Carbon\CarbonTimeZone;
use Illuminate\Auth\Events\Validated;

class PlatformTimeTrackingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = PlatformCategories::get();
        $games = Games::get();

        // $platforms = DB::table('platforms')
        //     ->join('platform_categories', 'platforms.platform_categories_id', '=', 'platform_categories.id', 'inner')
        //     ->select(
        //         'platforms.id',
        //         'platforms.name',
        //         'platforms.manufacturer',
        //         'platforms.platform_categories_id AS category'
        //     )
        //     ->get();

        $runningTimes = DB::table('platform_time_tracking')
            ->join('platforms', 'platforms.id', '=', 'platform_time_tracking.platform_id', 'inner')
            ->join('platform_categories', 'platforms.platform_categories_id', '=', 'platform_categories.id', 'inner')
            ->select(
                'platform_time_tracking.*',
                'platforms.name as name',
                'platforms.platform_categories_id AS category')
                // 'platform_categories.name as category')
            ->where('platform_time_tracking.stopped', '=', false )
            ->get();

            // dd($runningTimes);

        $tz = new CarbonTimeZone("Asia/Karachi");

        return Inertia::render('platform-tracking', [
            'categories' => $categories,
            // 'games' => $games,
            'platforms' => $runningTimes->map(function ($runningTime) {
                return [
                    'id' => $runningTime->id,
                    'platform_id' => $runningTime->platform_id,
                    'name' => $runningTime->name,
                    // 'start_time' => $runningTime->start_time,
                    // 'start_time' => Carbon::parse($runningTime->start_time)->setTimezone("Asia/Karachi")
                    'start_time' => Carbon::parse($runningTime->start_time, "Asia/Karachi")
                        // ->subMinutes(1)->subSeconds(1)
                        // ->diffForHumans(null, false, false),
                        // ->diffForHumans(),
                        // ->diffForHumans(['options' => Carbon::NO_ZERO_DIFF]),
                        // ->copy()->subHours(5)->subMinutes(30)->subSeconds(10)->diffForHumans([
                        ->copy()->subSeconds(1)->diffForHumans([
                            'parts' => 3,
                            'short' => false,
                            'join' => ', ', // join with commas
                        ]),
                    // 'manufacturer' => $platform->manufacturer,
                    'category' => $runningTime->category,
                ];
            }),
            // 'platforms' => $platforms->map(function ($platform) {
            //     return [
            //         'id' => $platform->id,
            //         'name' => $platform->name,
            //         'manufacturer' => $platform->manufacturer,
            //         'category' => $platform->category,
            //     ];
            // }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {

        $platformToTrack = Platforms::findOrFail($id);
        $date=now()->setTimezone("Asia/Karachi");

        $platformTimeStart = PlatformTimeTracking::create([
            'platform_id' => $platformToTrack['id'],
            'date' => $date,
            'games_id' => null,
            'start_time' => $date,
        ]);

        // return Route::redirect('URI', 'URI', 301);
        return to_route('platform-tracking');

            // 'date' => $platformToTrack['date'] ?? null,
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlatformTimeTrackingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    // public function show(PlatformTimeTracking $platformTimeTracking)
    public function show()
    {
        return Inertia::render('tracking-history');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PlatformTimeTracking $platformTimeTracking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlatformTimeTrackingRequest $request, PlatformTimeTracking $platformTimeTracking)
    {

        $identifier = $platformTimeTracking->id;

        $platformTimeToStop = PlatformTimeTracking::findOrFail($identifier);
        $date=now()->setTimezone("Asia/Karachi");

        $platformTimeToStop->end_time = $date;
        $platformTimeToStop->stopped = true;
        $platformTimeToStop->save();

        // return Route::redirect('URI', 'URI', 301);
        return to_route('platform-tracking');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PlatformTimeTracking $platformTimeTracking)
    {
        //
    }
}
