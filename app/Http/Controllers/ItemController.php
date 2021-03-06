<?php

namespace App\Http\Controllers;

use App\Event;
use App\Item;
use App\ItemCategory as Category;

use App\Http\Resources\Item as ItemResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth', 'verified', 'company']);
    }
    
    /**
     * Return a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ItemResource::collection(Auth::user()->company->items->map(function ($item) {
            return $item->only(['id', 'name', 'category_id', 'category_name', 'category_section', 'event_id', 'event_name', 'long_description', 'short_description']);
        }));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $event = Event::find($request->input('event_id'));

        if ($event && ! $event->company_id == Auth::user()->company_id) {
            return null;
        };

        $category = Category::find($request->input('category_id'));

        if ($category && ! $category->company_id == Auth::user()->company_id) {
            return null;
        };
        
        $item = Item::create([
            'company_id' => Auth::user()->company->id,
            'category_id' => $request->input('category_id'),
            'event_id' => $request->input('event_id'),
            'name' => $request->input('name'),
            'date' => $request->input('date'),
            'long_description' => $request->input('long_description'),
            'short_description' => $request->input('short_description'),
            'time' => $request->input('time'),
        ]);

        return new ItemResource($item);
    }

    /**
     * Return a specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Item::findOrFail($id);

        if ($item->company->id == Auth::user()->company->id) {
            return new ItemResource($item);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $event = Event::find($request->input('event_id'));

        if ($event && ! $event->company_id == Auth::user()->company_id) {
            return null;
        };

        $category = Category::find($request->input('category_id'));

        if ($category && ! $category->company_id == Auth::user()->company_id) {
            return null;
        };

        $item = Item::findOrFail($id);

        if ($item->company->id == Auth::user()->company->id) {
            $item->category_id = $request->input('category_id');
            $item->event_id = $request->input('event_id');
            $item->name = $request->input('name');
            $item->date = $request->input('date');
            $item->long_description = $request->input('long_description');
            $item->short_description = $request->input('short_description');
            $item->time = $request->input('time');

            $item->save();

            return new ItemResource($item);
        };
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);

        if ($item->company->id == Auth::user()->company->id) {
            $item->delete();
        }
    }
}
