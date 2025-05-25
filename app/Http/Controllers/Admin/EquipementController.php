<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Equipement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/equipements/index', [
            "equipements" => Equipement::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/equipements/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $req)
    {
        $validated = $req->validate([
            "name" => "required|string|min:2|unique:equipements,name"
        ]);

        Equipement::create($validated);

        return redirect()->route('equipements.index')->with('success', "equipement created successfully!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipement $equipement)
    {
        return Inertia::render('admin/equipements/show', [
            "equipement" => $equipement
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipement $equipement)
    {
        return Inertia::render('admin/equipements/edit', [
            "equipement" => $equipement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, Equipement $equipement)
    {
        $validated = $req->validate([
            // "unique:table,column,except,idColumn"
            "name" => "required|string|min:2|unique:equipements,name,{$equipement->id},id"
        ]);

        $equipement->update($validated);

        return redirect()->route('equipements.index')->with('success', "equipement updated successfully!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipement $equipement)
    {
        $equipement->delete();
        return redirect()->route('equipements.index')->with('success', "equipement deleted successfully!");
    }
}
