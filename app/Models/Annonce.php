<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use \Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Address;
use App\Models\Photo;
use App\Models\Avis;
use App\Models\AnnoncePreferenceValue;

class Annonce extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = ['title', 'description', 'user_id', 'address_id', 'loyer'];

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

    public function annoncePreferenceValues()
    {
        return $this->hasMany(AnnoncePreferenceValue::class);
    }

    public function annonceEquipements()
    {
        return $this->hasMany(AnnonceEquipement::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
