<?php

use App\Http\Controllers\Admin\EquipementController;
use App\Http\Controllers\Admin\PreferenceController;
use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\Proprietaire\AnnonceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard that redirects to role-specific dashboards
    Route::get('/dashboard', function () {
    $user = Auth::user();
        
        return match($user->role) {
            'admin' => redirect()->route('admin.dashboard'),
            'proprietaire' => redirect()->route('proprietaire.dashboard'),
            'colocataire' => redirect()->route('colocataire.dashboard'),
            default => Inertia::render('Dashboard')
        };
    })->name('dashboard');

    // Admin routes
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        Route::inertia('/dashboard', 'admin/dashboard')->name('admin.dashboard');
        Route::resource('users', UserAdminController::class);
        Route::resource('preferences', PreferenceController::class);
        Route::resource('equipements', EquipementController::class);
    });

    // Proprietaire routes
    Route::middleware(['role:proprietaire'])->prefix('proprietaire')->group(function () {
        Route::inertia('/dashboard', 'proprietaire/dashboard')->name('proprietaire.dashboard');
        Route::resource('annonces', AnnonceController::class);
    });

    // Colocataire routes
    Route::middleware(['role:colocataire'])->prefix('colocataire')->group(function () {
        Route::inertia('/dashboard', 'colocataire/dashboard')->name('colocataire.dashboard');
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';