<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;


/**
 * @method void middleware(string|array $middleware, array $options = [])
 */
class UserAdminController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth');
    //     $this->middleware('role:admin');
    // }
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        // $users = User::orderBy('created_at', 'desc')->paginate(10);

        // return Inertia::render('users/index', [
        //     'users' => $users
        // ]);

        $users = User::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            })
            ->when($request->input('role'), function ($query, $role) {
                $query->where('role', $role);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role'])
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    // public function create()
    // {
    //     return Inertia::render('users/create');
    // }

    /**
     * Store a newly created user in database.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'first_name' => 'required|string|max:255',
    //         'last_name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'phone' => 'required|string|max:20',
    //         'role' => 'required|in:admin,colocataire,proprietaire',
    //         'password' => ['required', 'confirmed', Rules\Password::defaults()],
    //     ]);

    //     User::create([
    //         'first_name' => $request->first_name,
    //         'last_name' => $request->last_name,
    //         'email' => $request->email,
    //         'phone' => $request->phone,
    //         'role' => $request->role,
    //         'password' => Hash::make($request->password),
    //     ]);

    //     return redirect()->route('users.index')->with('success', 'User created.');

    // }

    /**
     * Display the specified user.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('users/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('users/edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified user in database.
     */
    public function update(Request $request, string $id)
    {
        // dd($request);
        $user = User::findOrFail($id);

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:20',
            'role' => 'required|in:admin,colocataire,proprietaire',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $data = $request->only([
            'first_name',
            'last_name',
            'email',
            'phone',
            'role'
        ]);

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('success', 'User updated.');
    }

    /**
     * Remove the specified user from database.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted.');
    }
}
