<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
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
        'dates' => 'object',
        'newsletter' => 'object',
        'pack' => 'object',
    ];
    
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['ends', 'starts'];

    /**
     * Get the event's end date.
     *
     * @return string
     */
    public function getEndsAttribute()
    {
        if (is_object(json_decode($this->original['dates']))) {
            return json_decode($this->original['dates'])->ends;
        };

        return null;
    }

    /**
     * Get the event's start date.
     *
     * @return string
     */
    public function getStartsAttribute()
    {
        if (is_object(json_decode($this->original['dates']))) {
            return json_decode($this->original['dates'])->starts;
        };

        return null;
    }
    
    /**
     * The items that this event has.
     */
    public function items()
    {
        return $this->hasMany('App\Item');
    }
    
    /**
     * The packages that this event has.
     */
    public function packages()
    {
        return $this->hasMany('App\Package');
    }
    
    /**
     * The company that the event belongs to.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}
