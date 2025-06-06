<?php

namespace App\Http\Controllers\Colocataire;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ColocataireAnnonceController extends Controller
{
    public function index(Request $request)
    {
        $query = Annonce::query()
            ->with(['address.region', 'photos', 'user', 'annonceEquipements.equipements'])
            ->orderBy('created_at', 'desc');


        // Apply filters
        if ($request->has('search') && $request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->has('city') && $request->city) {
            $query->whereHas('address', function($q) use ($request) {
                $q->where('city', 'like', '%' . $request->city . '%');
            });
        }

        if ($request->has('min_price') && $request->min_price) {
            $query->where('loyer', '>=', $request->min_price);
        }

        if ($request->has('max_price') && $request->max_price) {
            $query->where('loyer', '<=', $request->max_price);
        }

        // $annonces = $query->paginate(12)->withQueryString();
        $annonces = $query->get();

        return Inertia::render('colocataire/listings/index', [
            'annonces' => $annonces,
            'filters' => $request->only(['search', 'city', 'min_price', 'max_price']),
        ]);
    }

    public function show(Annonce $annonce)
    {
        $annonce = $annonce->load([
            'address.region', 
            'photos', 
            'user',
            'annoncePreferenceValues.preference', 
            'annoncePreferenceValues.preferenceValue.preference', 
            'annonceEquipements.equipements'
        ]);

        return Inertia::render('colocataire/listings/show', [
            'annonce' => $annonce,
        ]);
    }
}