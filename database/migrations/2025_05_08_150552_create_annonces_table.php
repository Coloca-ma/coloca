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
        Schema::create('annonces', function (Blueprint $table) {
            $table->uuid('id')->primary(); 
            $table->string('title');
            $table->text('description');
            $table->uuid('address_id');
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('cascade');
            $table->float('loyer');
            $table->timestamps(); // created_at, updated_at
            $table->softDeletes(); // deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonces');
    }
};
