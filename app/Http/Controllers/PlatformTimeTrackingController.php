<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Games;
use App\Models\Platforms;
use Carbon\CarbonTimeZone;
use Carbon\CarbonInterface;
use Illuminate\Support\Str;
use App\Models\PlatformCategories;
use Illuminate\Support\Facades\DB;
use App\Models\PlatformTimeTracking;
use App\Exports\PlatformTimeTrackingExport;
use App\Exports\PlatformTimeTrackingRawExport;
use App\Http\Requests\StorePlatformTimeTrackingRequest;
use App\Http\Requests\CreatePlatformTimeTrackingRequest;
use App\Http\Requests\UpdatePlatformTimeTrackingRequest;

class PlatformTimeTrackingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = PlatformCategories::get();
        // $games = Games::get();

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
                    'name' => Str::limit($runningTime->name, 60),
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
        // ensure no active timer already exists for this platform
        $exists = DB::table('platform_time_tracking')
        ->where('platform_id', $id)
        ->whereNull('end_time')
        ->where('stopped', false)
        ->exists();

        if ($exists) {
            // return a 409 or an Inertia redirect with error — handle per your frontend expectations
            return response()->json(['message' => 'Timer already running for this platform'], 409);
            // return Inertia::render('welcome', [

            // ]);
            // return redirect()->back()->with('error', 'An error occurred!');
        }

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
        $runningTimes = DB::table('platform_time_tracking')
            ->join('platforms', 'platforms.id', '=', 'platform_time_tracking.platform_id', 'inner')
            ->join('platform_categories', 'platforms.platform_categories_id', '=', 'platform_categories.id', 'inner')
            ->select(
                'platform_time_tracking.*',
                'platforms.name as name',
                'platforms.platform_categories_id AS category_id',
                'platform_categories.name AS category')
            ->where('platform_time_tracking.stopped', '=', true )
            ->orderBy('id', 'desc')
            ->get();

        $tz = new CarbonTimeZone("Asia/Karachi");

        return Inertia::render('tracking-history', [
            'platforms' => fn () => $runningTimes->map(function ($runningTime) {
                return [
                    'id' => $runningTime->id,
                    'platform_id' => $runningTime->platform_id,
                    'name' => Str::limit($runningTime->name, 40),
                    'date' => Carbon::parse($runningTime->date)->toFormattedDayDateString(),
                    'start_time' => Carbon::parse($runningTime->start_time, "Asia/Karachi")->format(' h:i:s A'),
                    'end_time' => Carbon::parse($runningTime->end_time, "Asia/Karachi")->format(' h:i:s A'),
                    'time_diff' => Carbon::parse($runningTime->end_time, "Asia/Karachi")
                        ->copy()
                        ->from($runningTime->start_time, [
                            'syntax' => CarbonInterface::DIFF_ABSOLUTE,
                            'parts' => 3,
                            'short' => false,
                            'join' => ', ', // join with commas
                        ]),
                    'category' => $runningTime->category,
                ];
            }),
        ]);
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

    public function export()
    {
        $now = Carbon::parse(Carbon::now(), "Asia/Karachi")->format('Y-m-d h_i_s A');
        return (new PlatformTimeTrackingExport)->download("tracking-history - {$now}.csv");
    }

    public function export_raw()
    {
        $now = Carbon::parse(Carbon::now(), "Asia/Karachi")->format('Y-m-d h_i_s A');
        return (new PlatformTimeTrackingRawExport)->download("tracking-history-raw - {$now}.csv");
    }
}
