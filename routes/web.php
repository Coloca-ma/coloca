<?php

// use App\Http\Controllers\Admin\UserAdminController;
// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
// use App\Http\Controllers\Proprietaire\AnnonceController;


// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// Route::middleware(['web', 'auth'])->group(function () {
//     Route::resource('users', UserAdminController::class);
//     Route::prefix('proprietaire')->group(function () {
//         Route::resource('annonces', AnnonceController::class);
//     });
// });



// require __DIR__ . '/settings.php';
// require __DIR__ . '/auth.php';


use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\Proprietaire\AnnonceController;
use App\Http\Controllers\Colocataire\ColocataireController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Routes admin
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', UserAdminController::class);
    });

    // Routes proprietaire
    Route::middleware(['role:proprietaire'])->prefix('proprietaire')->group(function () {
        Route::resource('annonces', AnnonceController::class);
    });

    // Routes colocataire
    Route::middleware(['role:colocataire'])->prefix('colocataire')->group(function () {
        // Route::get('/', [ColocataireController::class, 'index'])->name('colocataire.index');
        // Ajoutez d'autres routes colocataire ici
    });

    Route::get('/test-middleware', function () {
        return 'Middleware works!';
    })->middleware('role:admin');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
