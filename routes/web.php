<?php

use App\Http\Controllers\AnnonceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/hr', function () {
    return Inertia::render('dashboard');
});

Route::resource("annonces", AnnonceController::class);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
