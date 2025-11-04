<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Platforms;
use App\Models\PlatformCategories;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePlatformsRequest;
use App\Http\Requests\UpdatePlatformsRequest;

class PlatformsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $categories = PlatformCategories::get();

        // $platforms = DB::table('platforms')
        //     ->join('platform_categories', 'platforms.platform_categories_id', '=', 'platform_categories.id', 'inner')
        //     ->select('platforms.*', 'platform_categories.name AS platcatname', 'platforms.name AS name')
        //     ->get();

        // return Inertia::render('platform-layout', [
        //     'categories' => $categories,
        //     'platforms' => $platforms->map(function ($platform) {
        //         return [
        //             'id' => $platform->id,
        //             'name' => $platform->name,
        //             'manufacturer' => $platform->manufacturer,
        //             'category' => $platform->platcatname,
        //         ];
        //     }),
        // ]);

        $categories = PlatformCategories::get();

            // $something = DB::table('platforms')
            // $something = DB::table('platform_time_tracking')
            //     ->join('platform_time_tracking', 'platform_time_tracking.platform_id', '=', 'platforms.id', 'full')
            //     ->select('platform_id')
            //     ->distinct()
            //     ->whereNotIn('platform_time_tracking.platform_id', 'platforms.id')
            //     ->get();
            //     ->toArray();

        $platformsCurrentlyRunning = DB::table('platform_time_tracking')
            ->whereNull('end_time')
            ->Where('stopped', false)
            ->pluck('platform_id as id')
            ->toArray();

        $platformsQuery = DB::table('platforms')
            ->join('platform_categories', 'platforms.platform_categories_id', '=', 'platform_categories.id', 'inner')
            ->select(
                'platforms.*',
                'platforms.id AS id',
                'platforms.name as name',
                'platforms.platform_categories_id AS category_id'
            );

        $platformsQuery->when(count($platformsCurrentlyRunning) > 0, fn($q) => $q->whereNotIn('platforms.id', $platformsCurrentlyRunning));

        $platforms = $platformsQuery->get();


        $tz = new CarbonTimeZone("Asia/Karachi");

        return Inertia::render('platform-layout', [
            'categories' => $categories,
            'platforms' => $platforms->map(function ($platform) use ($platformsCurrentlyRunning) {
                return [
                    'id' => $platform->id,
                    'name' => $platform->name,
                    'manufacturer' => $platform->manufacturer,
                    'category' => $platform->category_id,
                    'is_running' => in_array($platform->id, $platformsCurrentlyRunning, true),
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return dd('create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlatformsRequest $request)
    {
        $validated = $request->validated();

        // Retrieve a portion of the validated input data...
        $validated = $request->safe()->only(['category','name', 'manufacturer']);
        $platform = Platforms::create([
            'platform_categories_id' => $validated['category'],
            'name' => $validated['name'],
            'manufacturer' => $validated['manufacturer'] ?? null,
        ]);

        // return redirect()->route('platform-layout');
        return to_route('platform-layout');
    }

    /**
     * Display the specified resource.
     */
    public function show(Platforms $platforms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Platforms $platforms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlatformsRequest $request, Platforms $platforms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Platforms $platforms, $id)
    public function destroy($id)
    {
        if (Auth::check()) {
            $platform = Platforms::findOrFail($id);
            $platform->delete();
        }
    }
}
