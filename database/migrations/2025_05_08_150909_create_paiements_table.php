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
        Schema::create('paiements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('receiver_user');
            $table->foreign('receiver_user')->references('id')->on('users');
            $table->uuid('sender_user');
            $table->foreign('sender_user')->references('id')->on('users');
            $table->float('montant');
            $table->date('due_date');
            $table->date('paid_at')->nullable();
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
