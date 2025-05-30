<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Annonce;
use App\Models\Preference;
use App\Models\PreferenceOption;
use \Illuminate\Database\Eloquent\Concerns\HasUuids;

class AnnoncePreferenceValue extends Model
{
    use HasUuids;
    protected $fillable = ['annonce_id', 'preference_id', 'preference_option_id'];

    public function annonce()
    {
        return $this->belongsTo(Annonce::class);
    }

    public function preference()
    {
        return $this->belongsTo(Preference::class);
    }

    public function preferenceValue()
    {
        return $this->belongsTo(PreferenceOption::class, 'preference_option_id');
    }
}
