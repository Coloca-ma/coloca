<?php

namespace App\Http\Controllers\Proprietaire;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnonceRequest;
use App\Models\Address;
use App\Models\Annonce;
use App\Models\AnnonceEquipement;
use App\Models\AnnoncePreferenceValue;
use App\Models\Equipement;
use App\Models\Photo;
use App\Models\Preference;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AnnonceController extends Controller
{
    public function index()
    {
        return Inertia::render('proprietaire/annonces/index', [
            'annonces' => Annonce::with('address')->get(),
            'addresses' => Address::all(),
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        // Log::info(Preference::all()->load(['preferenceValues']));
        return Inertia::render('proprietaire/annonces/create', [
            'regions' => Region::all(),
            'equipements' => Equipement::all(),
            'preferences' => Preference::all()->load(['preferenceValues'])
        ]);
    }

    public function store(StoreAnnonceRequest $req)
    {
        $validated = $req->validated();
        // dd($validated);

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
            'user_id' => Auth::id(),
        ]);

        foreach ($validated["preferences"] as $prefAnnonce) {
            AnnoncePreferenceValue::create([
                'annonce_id' => $annonce->id,
                'preference_id' => $prefAnnonce['preferenceId'],
                'preference_option_id' => $prefAnnonce['valueId'],
            ]);
        }

        foreach ($validated["equipements"] as $equipement) {
            Log::info($equipement);
            AnnonceEquipement::create([
                "annonce_id" => $annonce->id,
                "equipement_id" => $equipement['id'],
            ]);
        }

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

    public function show(Annonce $annonce)
    {
        $annonce = $annonce->load(['address.region', 'photos', 'annoncePreferenceValues.preference', 'annoncePreferenceValues.preferenceValue.preference', 'annonceEquipements', 'annonceEquipements.equipements']);
        // Log::info($annonce);

        return Inertia::render('proprietaire/annonces/show', [
            'annonce' => $annonce,
        ]);
    }

    public function edit(Annonce $annonce)
    {
        $annonce = $annonce->load(['address.region', 'photos', 'annoncePreferenceValues.preference', 'annoncePreferenceValues.preferenceValue', 'annonceEquipements', 'annonceEquipements.equipements']);
        Log::info($annonce);
        // dd($annonce);

        return Inertia::render('proprietaire/annonces/edit', [
            'annonce' => $annonce,
            'regions' => Region::all(),
            'preferences' => Preference::all()->load(['preferenceValues']),
            'equipements' => Equipement::all(),
        ]);
    }

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

        $incomingEquipementIds = collect($validated['equipements'])->pluck('id')->toArray();

        // Delete all equipements that are no longer selected by the user

        $annonce->annonceEquipements()
            ->whereNotIn('equipement_id', $incomingEquipementIds)
            ->delete();


        foreach ($validated["equipements"] as $equipAnnonce) {
            AnnonceEquipement::updateOrCreate(
                [
                    'annonce_id' => $annonce->id,
                    'equipement_id' => $equipAnnonce['id'],
                ],
                []
            );
        }

        $incomingPreferenceIds = collect($validated['preferences'])->pluck('preferenceId')->toArray();

        // Delete all equipements that are no longer selected by the user
        $annonce->annoncePreferenceValues()
            ->whereNotIn('preference_id', $incomingPreferenceIds)
            ->delete();

        foreach ($validated["preferences"] as $prefAnnonce) {
            AnnoncePreferenceValue::updateOrCreate(
                [
                    'annonce_id' => $annonce->id,
                    'preference_id' => $prefAnnonce['preferenceId'],
                ],
                [
                    'preference_option_id' => $prefAnnonce['valueId'],
                ]
            );
        }

        if ($req->hasFile('photos')) {
            foreach ($annonce->photos as $photo) {
                Storage::disk("public")->delete($photo->path);
                $photo->delete();
            }

            foreach ($req->file('photos') as $photo) {
                $path = $photo->store('annonces', 'public');

                $annonce->photos()->create([
                    'path' => $path,
                    'original_name' => $photo->getClientOriginalName(),
                ]);
            }
        }

        return redirect()->route('annonces.index')
            ->with('success', 'Annonce updated successfully!');
    }

    public function destroy(Annonce $annonce)
    {
        $annonce->delete();
        return redirect()->route('annonces.index')
            ->with('success', 'Annonce deleted successfully!');
    }
}
