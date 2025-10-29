<?php

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
    Route::get('platform-layout', function () {
        return Inertia::render('platform-layout');
    })->name('platform-layout');
});

require __DIR__.'/settings.php';
