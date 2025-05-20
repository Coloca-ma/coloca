<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use \Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Address;
use App\Models\Photo;
use App\Models\Avis;
use App\Models\PreferenceType;

class Annonce extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = ['title', 'description', 'address_id', 'loyer'];

    // Un annonce appartient à une adresse
    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id', "id");
    }

    // Un annonce a plusieurs photos
    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    // Un annonce a plusieurs avis
    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    // Un annonce a plusieurs preference types
    public function preferenceTypes()
    {
        return $this->hasMany(PreferenceType::class);
    }
}