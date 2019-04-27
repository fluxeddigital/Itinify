<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PackageUser extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'package_user';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The package that this relationship concerns.
     */
    public function package()
    {
        return $this->belongsTo('App\Package');
    }

    /**
     * The user that this relationship concerns.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
