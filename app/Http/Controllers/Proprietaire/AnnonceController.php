<?php

namespace App\Http\Controllers\Proprietaire;

use App\Http\Controllers\Controller;
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
        return Inertia::render('proprietaire/annonces/create', [
            'regions' => Region::all()
        ]);
    }

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

    public function show(Annonce $annonce)
    {
        $annonce = $annonce->load(['address.region', 'photos']);

        return Inertia::render('proprietaire/annonces/show', [
            'annonce' => $annonce,
        ]);
    }

    public function edit(Annonce $annonce)
    {
        $annonce = $annonce->load(['address.region', 'photos']);
        Log::info($annonce);

        return Inertia::render('proprietaire/annonces/edit', [
            'annonce' => $annonce,
            'regions' => Region::all()
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

    public function destroy(Annonce $annonce)
    {
        $annonce->delete();
        return redirect()->route('annonces.index')
            ->with('success', 'Annonce deleted successfully!');
    }
}
