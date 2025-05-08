<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Annonce;

class Avis extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['annonce_id', 'img'];

    //un avis appartient à une annonce
    public function annonce()
    {
        return $this->belongsTo(Annonce::class);
    }
}
