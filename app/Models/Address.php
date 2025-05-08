<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Factories\HasFactory;
use \Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\User;
use App\Models\Annonce;


class Address extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'street',
        'city',
        'postal_code',
        'country',
        'region',
    ];

    // Un address a plusieurs users
    public function users()
    {
        return $this->hasMany(User::class, 'addressed_id');
    }

    // Un address a plusieurs annonces
    public function annonces()
    {
        return $this->hasMany(Annonce::class, 'addressed_id');
    }

}
