<?php

namespace App\Http\Controllers\Colocataire;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ColocataireReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with(['annonce'])->where("user_id", Auth::id())->where('status', "!=", "cancelled")->get();
        return Inertia::render('colocataire/reservation/index', [
            "reservations" => $reservations,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create(Request $request)
    {
        $annonceId = $request->query('id');
        $reservation = new Reservation();
        $reservation["annonce_id"] = $annonceId;
        $reservation["user_id"] = Auth::id();

        $reservations = Reservation::where('annonce_id', $annonceId)->get();

        return Inertia::render('colocataire/reservation/create', [
            "reservation" => $reservation,
            "reservations" => $reservations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $req)
    {
        // dd($req);
        $validated = $req->validate([
            "user_id" => "required|uuid|exists:users,id",
            "annonce_id" => "required|uuid|exists:annonces,id",
            'status' => [
                'required',
                Rule::in(['pending', 'approved', 'rejected', 'cancelled', 'finished']),
            ],
            "start_date" => "required|date|after:today",
            "end_date" => "required|date|after_or_equal:start_date",
        ]);

        $oneYearFromNow = now()->addYear()->toDateString();

        if ($validated['start_date'] > $validated['end_date']) {
            if ($validated['start_date'] > $oneYearFromNow) {
                return redirect()
                    ->route('reservations.create', ['id' => $validated['annonce_id']])
                    ->withErrors(['start_date' => 'Start date must be within one year from today.'])
                    ->withInput();
            }
            return redirect()
                ->route('reservations.create', ['id' => $validated['annonce_id']])
                ->withErrors(['end_date' => 'End date must be after start date.'])
                ->withInput();
        }


        Reservation::create($validated);

        return redirect()->route('listings.index')->with('success', 'Reservation has been created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {

        return Inertia::render('colocataire/reservation/edit', [
            'reservation' => $reservation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, Reservation $reservation)
    {
        if ($req->has("updateStatus")) {
            $validated = $req->validate(['status' => 'required|string|in:cancelled']);
            $reservation->update(['status' => $validated["status"]]);
            return redirect()->route('reservations.index')
                ->with('success', 'Reservation has been cancelled successfully.');
        } else {
            $validated = $req->validate([
                "user_id" => "required|uuid|exists:users,id",
                "annonce_id" => "required|uuid|exists:annonces,id",
                'status' => [
                    'required',
                    Rule::in(['pending', 'approved', 'rejected', 'cancelled', 'finished']),
                ],
                "start_date" => "required|date|after:today",
                "end_date" => "required|date|after_or_equal:start_date",
            ]);

            $oneYearFromNow = now()->addYear()->toDateString();

            if ($validated['start_date'] > $validated['end_date']) {
                if ($validated['start_date'] > $oneYearFromNow) {
                    return redirect()
                        ->route('reservations.create', ['id' => $validated['annonce_id']])
                        ->withErrors(['start_date' => 'Start date must be within one year from today.'])
                        ->withInput();
                }
                return redirect()
                    ->route('reservations.create', ['id' => $validated['annonce_id']])
                    ->withErrors(['end_date' => 'End date must be after start date.'])
                    ->withInput();
            }

            $reservation->update($validated);

            return redirect()->route('reservations.index')
                ->with('success', 'Reservation updated successfully!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
