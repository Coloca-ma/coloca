<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnnonceRequest;
use App\Models\Address;
use App\Models\Annonce;
use App\Models\Photo;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Annonces/Index', [
            'annonces' => Annonce::with('address')->get(), // Include address relationship
            'addresses' => Address::all(),
            'success' => session('success'), // Add this to pass success message from session
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Annonces/Create', [
            'regions' => Region::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnnonceRequest $req)
    {
        $validated = $req->validated();

        $address = Address::create([
            'street' => $validated["address"]["street"],
            'city' => $validated["address"]["city"],
            'postal_code' => $validated["address"]["postal_code"],
            'region_id' => $validated["address"]["region"]["id"],
        ]);

        $annonce = Annonce::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'loyer' => $validated['loyer'],
            'address_id' => $address->id,
            // 'user_id' => auth()->id() // to add later
        ]);

        if ($req->hasFile('photos')) {
            foreach ($req->file('photos') as $photo) {
                $path = $photo->store('annonces', 'public');

                $annonce->photos()->create([
                    'path' => $path,
                    'original_name' => $photo->getClientOriginalName(),
                ]);
            }
        }

        return redirect()->route('annonces.index')
            ->with('success', 'Annonce created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Annonce $annonce)
    {
        $annonce = $annonce->load(['address.region', 'photos']);

        return Inertia::render('Annonces/Show', [
            'annonce' => $annonce,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Annonce $annonce)
    {
        $annonce = $annonce->load(['address.region', 'photos']);
        // dd($annonce);
        Log::info($annonce);
        return Inertia::render('Annonces/Edit', [
            'annonce' => $annonce,
            'regions' => Region::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAnnonceRequest $req, Annonce $annonce)
    {
        $validated = $req->validated();

        $annonce->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'loyer' => $validated['loyer'],
        ]);

        $annonce->address()->update([
            'street' => $validated['address']['street'],
            'city' => $validated['address']['city'],
            'postal_code' => $validated['address']['postal_code'],
            'region_id' => $validated['address']['region']['id'],
        ]);

        if ($req->hasFile('photos')) {
            foreach ($annonce->photos as $photo) {
                Storage::disk("public")->delete($photo->path);
                $photo->delete();
            }

            foreach ($req->file('photos') as $file) {
                $path = $file->store('annonces', 'public');
                $annonce->photos()->create([
                    "path" => $path,
                    'original_name' => $file->getClientOriginalName(),
                ]);
            }
        }
        return redirect()->route('annonces.index')
            ->with('success', 'Annonce updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Annonce $annonce)
    {
        $annonce->delete();
        return redirect()->route('annonces.index')
            ->with('success', 'Annonce deleted successfully!');
    }
}
