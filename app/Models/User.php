<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Address;
use App\Models\Avis;
use App\Models\Message;
use App\Models\Paiement;
use App\Models\PreferenceType;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['first_name', 'last_name', 'phone', 'role', 'email', 'password'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => 'string',
        ];
    }

    // // Un user appartient à une adresse
    // public function address()
    // {
    //     return $this->belongsTo(Address::class, 'address_id');
    // }

    // Un user a plusieurs avis
    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    // Un user a plusieurs messages
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // public function messagesEnvoyes()
    // {
    //     return $this->hasMany(Message::class, 'sender_id');
    // }

    // public function messagesRecus()
    // {
    //     return $this->hasMany(Message::class, 'receiver_id');
    // }

    // Un user a plusieurs paiements envoyés
    public function paiementsEnvoyes()
    {
        return $this->hasMany(Paiement::class, 'sender_user');
    }

    // Un user a plusieurs paiements reçus
    public function paiementsRecus()
    {
        return $this->hasMany(Paiement::class, 'receiver_user');
    }

    // Un user a plusieurs préférences
    // public function preferenceTypes()
    // {
    //     return $this->hasMany(PreferenceType::class);
    // }

    public function annonces()
    {
        return $this->hasMany(Annonce::class);
    }
}
