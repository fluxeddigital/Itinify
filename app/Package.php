<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
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
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'car_hire' => 'array',
        'customisation' => 'array',
        'flights' => 'array',
        'itinerary' => 'array',
        'notes' => 'array',
        'passengers' => 'array',
        'pricing' => 'array',
        'requirements' => 'array',
        'restaurants' => 'array',
        'transfers' => 'array',
    ];
    
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['client_name', 'event_name'];

    /**
     * Get the package's client's name.
     *
     * @return string
     */
    public function getClientNameAttribute()
    {
        if (is_object($this->client)) {
            return $this->client->name;
        };

        return null;
    }

    /**
     * Get the package's event's name.
     *
     * @return string
     */
    public function getEventNameAttribute()
    {
        if (is_object($this->event)) {
            return $this->event->name;
        };

        return null;
    }

    /**
     * The client that the package belongs to.
     */
    public function client()
    {
        return $this->belongsTo('App\Client')->select('id', 'name');
    }

    /**
     * The event that the package belongs to.
     */
    public function event()
    {
        return $this->belongsTo('App\Event')->select('id', 'name', 'dates');
    }

    /**
     * The users that belong to the package.
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    /**
     * The company that the package belongs to.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}
