<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PreferenceOption;
use \Illuminate\Database\Eloquent\Concerns\HasUuids;

class Preference extends Model
{
    use HasUuids;

    protected $fillable = ['name'];

    public function preferenceValues()
    {
        return $this->hasMany(PreferenceOption::class);
    }
}
