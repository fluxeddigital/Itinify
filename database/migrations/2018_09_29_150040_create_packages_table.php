<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('client_id')->unsigned()->nullable();
            $table->integer('event_id')->unsigned()->nullable();
            $table->string('title');
            $table->timestamp('accepted_at')->nullable();
            $table->string('accepted_by')->nullable();
            $table->longText('car_hire')->nullable();
            $table->longText('customisation')->nullable();
            $table->longText('documents')->nullable();
            $table->date('expires')->nullable();
            $table->longText('flights')->nullable();
            $table->date('issued')->nullable();
            $table->longText('itinerary')->nullable();
            $table->string('lead_status')->nullable();
            $table->longText('notes')->nullable();
            $table->longText('passengers')->nullable();
            $table->longText('pricing')->nullable();
            $table->longText('requirements')->nullable();
            $table->longText('restaurants')->nullable();
            $table->string('status')->nullable();
            $table->longText('transfers')->nullable();
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
        Schema::dropIfExists('packages');
    }
}
