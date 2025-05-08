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
        Schema::create('preference_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('preference_id');
            $table->foreign('preference_id')->references('id')->on('preferences');
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->uuid('annonce_id');
            $table->foreign('annonce_id')->references('id')->on('annonces');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preference_types');
    }
};
