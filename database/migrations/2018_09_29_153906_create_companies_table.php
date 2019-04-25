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
            $table->longText('about')->nullable();
            $table->longText('address')->nullable();
            $table->string('card_brand')->nullable();
            $table->string('card_last_four')->nullable();
            $table->longText('customisation')->nullable();
            $table->string('email');
            $table->longText('emails')->nullable();
            $table->longText('feefo')->nullable();
            $table->boolean('free')->default(0);
            $table->string('industry')->nullable();
            $table->string('logo')->nullable();
            $table->longText('mailchimp')->nullable();
            $table->longText('nexmo')->nullable();
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
