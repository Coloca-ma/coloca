<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Equipement extends Model
{
    use HasUuids;

    protected $fillable = ['name'];

    public function annonce()
    {
        return $this->belongsTo(Annonce::class);
    }
}
