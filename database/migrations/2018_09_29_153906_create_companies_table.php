<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->longText('about');
            $table->longText('address');
            $table->string('card_brand')->nullable();
            $table->string('card_last_four')->nullable();
            $table->longText('customisation');
            $table->string('email');
            $table->longText('feefo');
            $table->boolean('free')->default(0);
            $table->string('industry')->nullable();
            $table->string('logo')->nullable();
            $table->longText('mailchimp');
            $table->longText('nexmo');
            $table->string('phone')->nullable();
            $table->string('stripe_id')->nullable();
            $table->timestamp('trial_ends_at')->nullable();
            $table->string('vat_number')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
