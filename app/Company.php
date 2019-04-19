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
        'about' => 'object',
        'address' => 'object',
        'customisation' => 'object',
        'feefo' => 'object',
        'mailchimp' => 'object',
        'nexmo' => 'object',
    ];
    
    /**
     * The clients that belong to the company.
     */
    public function clients()
    {
        return $this->hasMany('App\Client')->select('id', 'name', 'created_at', 'email');
    }

    /**
     * The events that belong to the company.
     */
    public function events()
    {
        return $this->hasMany('App\Event')->select('id', 'name', 'created_at', 'dates');
    }

    /**
     * The items that belong to the company.
     */
    public function items()
    {
        return $this->hasMany('App\Item')->select('id', 'name', 'category_id', 'event_id');
    }

    /**
     * The item categories that belong to the company.
     */
    public function item_categories()
    {
        return $this->hasMany('App\ItemCategory')->select('id', 'name', 'section');
    }

    /**
     * The packages that belong to the company.
     */
    public function packages()
    {
        return $this->hasMany('App\Package')->select('id', 'title', 'client_id', 'created_at', 'event_id');
    }

    /**
     * The users that belong to the company.
     */
    public function users()
    {
        return $this->hasMany('App\User')->select('id', 'email', 'first_name', 'last_name');
    }
}
