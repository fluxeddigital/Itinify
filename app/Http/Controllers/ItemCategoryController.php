<?php

namespace App\Http\Controllers;

use App\ItemCategory as Category;
use App\Http\Resources\ItemCategory as CategoryResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ItemCategoryController extends Controller
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
        return CategoryResource::collection(Auth::user()->company->item_categories);
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
            'section' => 'required',
        ]);

        $category = Category::create([
            'company_id' => Auth::user()->company->id,
            'name' => $request->input('name'),
            'section' => $request->input('section'),
        ]);

        $category->save();

        return new CategoryResource($category);
    }

    /**
     * Return a specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);

        if ($category->company->id == Auth::user()->company->id) {
            return new CategoryResource($category);
        };
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
            'section' => 'required',
        ]);

        $category = Category::findOrFail($id);

        if ($category->company->id == Auth::user()->company->id) {
            $category->name = $request->input('name');
            $category->section = $request->input('section');

            $category->save();
        }

        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->company->id == Auth::user()->company->id) {
            foreach ($category->items as $item) {
                $item->category_id = null;
                
                $item->save();
            }

            $category->delete();
        }
    }
}
