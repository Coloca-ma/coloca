<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Preference;
use \Illuminate\Database\Eloquent\Concerns\HasUuids;


class PreferenceOption extends Model
{
    use HasUuids;

    protected $fillable = ['preference_id', 'value'];

    public function preference()
    {
        return $this->belongsTo(Preference::class);
    }
}
