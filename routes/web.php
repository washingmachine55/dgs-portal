<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlatformsController;
use App\Http\Controllers\PlatformTimeTrackingController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Route::get('platform-tracking', function () {
    //     return Inertia::render('platform-tracking');
    // })->name('platform-tracking');
    // Route::get('platform-layout', function () {
    //     return Inertia::render('platform-layout');
    // })->name('platform-layout');
    Route::get('platform-layout', [PlatformsController::class, 'index'])->name('platform-layout');
    Route::post('platform-layout', [PlatformsController::class, 'store'])->name('PlatformsController.store');
    Route::delete('platform-layout/{id}', [PlatformsController::class, 'destroy'])->name('PlatformsController.destroy');

    Route::get('platform-tracking', [PlatformTimeTrackingController::class, 'index'])->name('platform-tracking');
    Route::get('platform-tracking/{id}', [PlatformTimeTrackingController::class, 'create'])->name('PlatformTimeTrackingController.create');
    Route::put('platform-tracking/{platformTimeTracking}', [PlatformTimeTrackingController::class, 'update'])->name('PlatformTimeTrackingController.update');

    Route::get('tracking-history', [PlatformTimeTrackingController::class, 'show'])->name('tracking-history');

    Route::get('/tracking-history/export_raw', [PlatformTimeTrackingController::class, 'export_raw']);
    Route::get('/tracking-history/export', [PlatformTimeTrackingController::class, 'export']);
});

require __DIR__.'/settings.php';
