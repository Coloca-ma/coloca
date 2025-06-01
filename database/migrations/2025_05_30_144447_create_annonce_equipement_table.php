<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('annonce_equipements', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("annonce_id")->constrained("annonces")->onDelete('cascade');
            $table->foreignUuid("equipement_id")->constrained("equipements")->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonce_equipements');
    }
};
