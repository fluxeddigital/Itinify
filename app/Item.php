<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
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
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['category_name', 'event_name'];

    /**
     * Get the package's category's name.
     *
     * @return string
     */
    public function getCategoryNameAttribute()
    {
        if (is_object($this->category)) {
            return $this->category->name;
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
     * The category that the item belongs to.
     */
    public function category()
    {
        return $this->belongsTo('App\ItemCategory');
    }
    
    /**
     * The event that the item belongs to.
     */
    public function event()
    {
        return $this->belongsTo('App\Event');
    }
    
    /**
     * The company that the item belongs to.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}
