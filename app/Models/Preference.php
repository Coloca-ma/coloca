<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\PreferenceType;

class Preference extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['key'];

    // un preference a plusieurs types de preference
    public function preferenceTypes()
    {
        return $this->hasMany(PreferenceType::class);
    }
}
