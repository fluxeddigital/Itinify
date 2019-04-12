<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The client that the contact belongs to.
     */
    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    /**
     * The company that the contact belongs to.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}
