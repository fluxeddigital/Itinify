<?php

namespace App;

use Laravel\Cashier\Billable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use Billable, SoftDeletes;

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
        'address' => 'array',
        'customisation' => 'array',
        'feefo' => 'array',
        'mailchimp' => 'array',
        'nexmo' => 'array',
    ];
    
    /**
     * The clients that belong to the company.
     */
    public function clients()
    {
        return $this->hasMany('App\Client');
    }

    /**
     * The events that belong to the company.
     */
    public function events()
    {
        return $this->hasMany('App\Event');
    }

    /**
     * The items that belong to the company.
     */
    public function items()
    {
        return $this->hasMany('App\Item');
    }

    /**
     * The item categories that belong to the company.
     */
    public function item_categories()
    {
        return $this->hasMany('App\ItemCategory');
    }

    /**
     * The packages that belong to the company.
     */
    public function packages()
    {
        return $this->hasMany('App\Package');
    }

    /**
     * The users that belong to the company.
     */
    public function users()
    {
        return $this->hasMany('App\User');
    }
}
