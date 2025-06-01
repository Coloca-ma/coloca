<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnnonceEquipement extends Model
{
    use HasUuids;

    protected $fillable = ['annonce_id', 'equipement_id'];

    public function annonce()
    {
        return $this->belongsTo(Annonce::class);
    }

    public function equipements()
    {
        return $this->belongsTo(Equipement::class, 'equipement_id');
    }
}
