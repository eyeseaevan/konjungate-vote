<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('options', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id');
            $table->integer('proposal_id');
            $table->foreign('proposal_id')->references('id')->on('proposals')->onDelete('cascade');
            $table->string('option');
            $table->integer('votes')->default(0);
            $table->timestamps();
        });

        //DB::statement("ALTER SEQUENCE options_id_seq MINVALUE 0 START 0 RESTART 0");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('options');
    }
}
