<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Platforms;
use App\Models\PlatformCategories;
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
        $categories = PlatformCategories::get();

        $platforms = DB::table('platforms')
            ->join('platform_categories', 'platforms.platform_categories_id', '=', 'platform_categories.id', 'inner')
            ->select('platforms.*', 'platform_categories.name AS platcatname', 'platforms.name AS name')
            ->get();

        return Inertia::render('platform-layout', [
            'categories' => $categories,
            'platforms' => $platforms->map(function ($platform) {
                return [
                    'id' => $platform->id,
                    'name' => $platform->name,
                    'manufacturer' => $platform->manufacturer,
                    'category' => $platform->platcatname,
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
