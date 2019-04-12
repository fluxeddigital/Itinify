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
            $table->text('car_hire')->nullable();
            $table->text('customisation')->nullable();
            $table->date('expires')->nullable();
            $table->text('flights')->nullable();
            $table->date('issued')->nullable();
            $table->text('itinerary')->nullable();
            $table->string('lead_status')->nullable();
            $table->text('passengers')->nullable();
            $table->text('pricing')->nullable();
            $table->date('reminder')->nullable();
            $table->text('requirements')->nullable();
            $table->text('restaurants')->nullable();
            $table->string('status')->nullable();
            $table->text('transfers')->nullable();
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
