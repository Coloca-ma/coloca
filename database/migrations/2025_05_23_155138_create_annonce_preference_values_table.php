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
        Schema::create('annonce_preference_values', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('annonce_id');
            $table->uuid('preference_id');
            $table->uuid('preference_option_id');
            $table->foreign('annonce_id')->references('id')->on('annonces')->onDelete('cascade');
            $table->foreign('preference_id')->references('id')->on('preferences')->onDelete('cascade');
            $table->foreign('preference_option_id')->references('id')->on('preference_options')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonce_preference_values');
    }
};
