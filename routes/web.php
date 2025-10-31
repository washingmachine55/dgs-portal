<?php

use App\Http\Controllers\PlatformsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('platform-tracking', function () {
        return Inertia::render('platform-tracking');
    })->name('platform-tracking');
    // Route::get('platform-layout', function () {
    //     return Inertia::render('platform-layout');
    // })->name('platform-layout');
    Route::get('platform-layout', [PlatformsController::class, 'index'])->name('platform-layout');

    Route::post('platform-layout', [PlatformsController::class, 'store'])->name('PlatformsController.store');
    Route::delete('platform-layout/{id}', [PlatformsController::class, 'destroy'])->name('PlatformsController.destroy');
});

require __DIR__.'/settings.php';
