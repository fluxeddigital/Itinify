<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
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
     * The resources that the note belongs to.
     */
    public function notable()
    {
        return $this->morphTo();
    }
    
    /**
     * The company that the note belongs to.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}
