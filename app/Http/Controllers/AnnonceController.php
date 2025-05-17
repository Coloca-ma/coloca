<?php

namespace App\Http\Controllers;

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
    public function store(Request $req)
    {
        // dump("erty");
        $validated = $req->validate([
            "title" => "required|string|max:50",
            "description" => "required|string",
            "address.street" => "required|string|max:255",
            "address.city" => "required|string|max:50",
            "address.postalCode" => "required|digits:5",
            "address.region.id" => "required|string|exists:regions,id",
            "loyer" => "required|numeric",
            "photos" => "array",
            "photos.*" => 'image|mimes:jpeg,png,jpg,gif,svg',
        ], [
            "title.required" => "the title is required",
            "title.max" => "the title is too long",
            "description.required" => "the description is required",
            "address.street.required" => "the street is too long",
            "address.street.max" => "the address is required",
            "address.city.required" => "the address is required",
            "title.city.max" => "the city is too long",
            "address.postalCode.required" => "the address is required",
            "address.postalCode.digits" => "the postalCode is out of range",
            "address.region.id.required" => "the address is required",
            "loyer.required" => "the loyer is required",
            "photos" => "array",
            "photos.mimes" => "this file isn't supported",

        ]);

        $address = Address::create([
            'street' => $validated["address"]["street"],
            'city' => $validated["address"]["city"],
            'postal_code' => $validated["address"]["postalCode"],
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
        // with method is linking the model with it's linked ones and the array params are the names of the functions of the relationship and when address.region it's says that address also has a relation with region
        $annonce = Annonce::select(['id', 'title', 'description', 'loyer', 'address_id'])
            ->with([
                'photos:annonce_id,path',
                'address' => function ($q) {
                    $q->select('id', 'street', 'city', 'postal_code', 'region_id');
                },
                'address.region:id,name',
            ])
            ->findOrFail($annonce->id);

        return Inertia::render('Annonces/Show', [
            'annonce' => $annonce,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Annonce $annonce)
    {
        $annonce = Annonce::select(['id', 'title', 'description', 'loyer', 'address_id'])
            ->with([
                'address' => function ($q) {
                    $q->select('id', 'street', 'city', 'postal_code', 'region_id');
                },
                'address.region:id,name',
            ])
            ->findOrFail($annonce->id);

        return Inertia::render('Annonces/Edit', [
            'annonce' => $annonce,
            'regions' => Region::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, Annonce $annonce)
    {
        $validated = $req->validate([
            "title" => "required|string|max:50",
            "description" => "required|string",
            "address.street" => "required|string|max:255",
            "address.city" => "required|string|max:50",
            "address.postal_code" => "required|digits:5",
            "address.region.id" => "required|string|exists:regions,id",
            "loyer" => "required|numeric",
            "photos" => "array",
            "photos.*" => 'image|mimes:jpeg,png,jpg,gif,svg',
        ], [
            "title.required" => "the title is required",
            "title.max" => "the title is too long",
            "description.required" => "the description is required",
            "address.street.required" => "the street is too long",
            "address.street.max" => "the address is required",
            "address.city.required" => "the address is required",
            "title.city.max" => "the city is too long",
            "address.postal_code.required" => "the address is required",
            "address.postal_code.digits" => "the postal Code is out of range",
            "address.region.id.required" => "the address is required",
            "loyer.required" => "the loyer is required",
            "photos" => "array",
            "photos.mimes" => "this file isn't supported",
        ]);

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
