<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Annonce;
use App\Models\User;
use App\Models\Preference;

class PreferenceType extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['preference_id', 'user_id', 'annonce_id'];

    // Un preference type appartient à une preference
    public function preference()
    {
        return $this->belongsTo(Preference::class);
    }
    
    // Un preference type appartient à un user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un preference type appartient à une annonce
    public function annonce()
    {
        return $this->belongsTo(Annonce::class);
    }
}
