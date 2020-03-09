<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Traits\genid;

class CreateVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user_id');
            $table->integer('proposal_id')->nullable();
            $table->foreign('proposal_id')->references('id')->on('proposals')->onDelete('cascade');
            $table->string('option_id');
            $table->foreign('option_id')->references('id')->on('options')->onDelete('cascade');
            $table->string('vote');
            $table->string('address');
            $table->string('signature');
            $table->boolean('is_valid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('votes');
    }
}
