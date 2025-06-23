<?php

namespace App\Http\Controllers\Proprietaire;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProprietaireReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with(['user', 'annonce'])
            ->whereHas('annonce', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->get();

        Log::info($reservations);
        return Inertia::render('proprietaire/reservations/index', [
            "reservations" => $reservations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        return Inertia::render('proprietaire/reservations/edit', [
            "reservation" => $reservation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, Reservation $reservation)
    {
        $validated = $req->validate([
            "status" => "required|string|in:approved,rejected"
        ]);

        $reservation->update($validated);

        return redirect()->route('proprietaire.reservations.index')->with('success', "Status updated successfully!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
