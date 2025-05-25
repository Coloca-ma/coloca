<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Preference;
use App\Models\PreferenceOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PreferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preferences = Preference::with('preferenceValues')->get();
        return Inertia::render('admin/preferences/index', [
            "preferences" => $preferences
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/preferences/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $req)
    {
        $validated = $req->validate([
            "name" => "required|string|min:2|unique:preferences,name",
            "preference_values" => "required|array",
            "preference_values.*.value" => "required|string|min:2"
        ], [
            'name.required' => 'The name field is required.',
            'name.min' => 'The name must be at least 2 characters.',
            'preference_values.required' => 'At least one option is required.',
            'preference_values.*.value.required' => 'Option #:position value is required.',
            'preference_values.*.value.min' => 'The Option :position must be at least 2 characters.',
        ]);


        $preference = Preference::create([
            'name' => $validated['name']
        ]);

        foreach ($validated['preference_values'] as $option) {
            PreferenceOption::create([
                'preference_id' => $preference->id,
                'value' => $option['value']
            ]);
        }

        return redirect()->route('preferences.index')
            ->with('success', 'Prefrence created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Preference $preference)
    {
        $preference = $preference->load(['preferenceValues']);

        return Inertia::render('admin/preferences/show', [
            'preference' => $preference
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Preference $preference)
    {
        return Inertia::render('admin/preferences/edit', [
            'preference' => $preference->load(['preferenceValues'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, Preference $preference)
    {
        // Log::info($req);
        $validated = $req->validate([
            'name' => "required|string|min:2|unique:preferences,name,{$preference->id}",
            "preference_values" => "required|array",
            "preference_values.*.value" => "required|string|min:2"
        ], [
            'name.required' => 'The name field is required.',
            'name.min' => 'The name must be at least 2 characters.',
            'preference_values.required' => 'At least one option is required.',
            'preference_values.*.value.required' => 'Option #:position value is required.',
            'preference_values.*.value.min' => 'The Option :position must be at least 2 characters.',
        ]);
        // Update the name in the preferences table
        $preference->update(['name' => $validated['name']]);

        // Delete old options (or you can choose to sync instead of delete/recreate)
        $preference->preferenceValues()->delete();

        // Create new options
        foreach ($validated['preference_values'] as $value) {
            $preference->preferenceValues()->create(['value' => $value['value']]);
        }

        return redirect()->route('preferences.index')
            ->with('success', 'Prefrence updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Preference $preference)
    {
        $preference->delete();
        return redirect()->route('preferences.index')
            ->with('success', 'Prefrence deleted successfully!');
    }
}
