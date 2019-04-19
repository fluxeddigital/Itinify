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
            $table->longText('car_hire');
            $table->longText('customisation');
            $table->longText('documents');
            $table->date('expires')->nullable();
            $table->longText('flights');
            $table->date('issued')->nullable();
            $table->longText('itinerary');
            $table->string('lead_status')->nullable();
            $table->longText('notes');
            $table->longText('passengers');
            $table->longText('pricing');
            $table->longText('requirements');
            $table->longText('restaurants');
            $table->string('status')->nullable();
            $table->longText('transfers');
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
