<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'annonces' => Annonce::with(['address.region', 'photos', 'user', 'annonceEquipements.equipements'])
                ->latest()
                ->take(6)
                ->get(),
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }
}
