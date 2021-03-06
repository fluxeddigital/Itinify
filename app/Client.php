<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Client extends Model
{
    use Notifiable, SoftDeletes;

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
        'address' => 'object',
        'contacts' => 'object',
        'interests' => 'object',
        'notes' => 'object',
    ];

    /**
     * The packages that the client has
     */
    public function packages()
    {
        return $this->hasMany('App\Package');
    }

    /**
     * The company that the client belongs to.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    /**
     * Route notifications for the Nexmo channel.
     *
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return string
     */
    public function routeNotificationForNexmo($notification)
    {
        return $this->contact_mobile;
    }
}
