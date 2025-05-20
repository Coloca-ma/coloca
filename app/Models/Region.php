<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'code'];

    public $incrementing = false; // Disable auto-incrementing
    // protected $keyType = 'string'; // Set key type to string
    // protected $primaryKey = 'id'; // Explicitly define the primary key column (optional if named 'id')

    // protected $cast = ['id' => 'string'];
}