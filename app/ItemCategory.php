<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemCategory extends Model
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
     * The items that the category has.
     */
    public function items()
    {
        return $this->hasMany('App\Item', 'category_id');
    }
    
    /**
     * The company that the item belongs to.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}
