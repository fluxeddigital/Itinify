<?php

namespace App\Http\Controllers;

use App\User;

use App\Http\Resources\User as UserResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
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
        return UserResource::collection(Auth::user()->company->users);
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
            'email' => 'required|email|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'company_id' => Auth::user()->company->id,
            'email' => $request->input('email'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'password' => Hash::make($request->input('password')),
        ]);

        $user->email_verified_at = $user->created_at;

        $user->save();

        return new UserResource($user);
    }

    /**
     * Return a specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        if ($user->company->id == Auth::user()->company->id) {
            return new UserResource($user);
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
        $user = User::findOrFail($id);

        $request->validate([
            'email' => 'required|email|unique:users,id,' . $user->id,
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'nullable|min:6',
        ]);

        if ($user->company->id == Auth::user()->company->id) {
            $user->email = $request->input('email');
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');

            if ($request->input('password')) {
                $user->password = Hash::make($request->input('password'));
            }

            $user->save();
        }

        return new UserResource($user);
    }

    /**
     * Attach the specified resource to a company in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function attach(Request $request)
    {
		if ($request->input('id') && $request->input('email')) {
            $user = User::findOrFail($request->input('id'));

            if ($user->email == $request->input('email') && ! $user->company_id) {
                $user->company_id = Auth::user()->company->id;

                $user->save();

                return new UserResource($user);
            };
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
        $user = User::findOrFail($id);

        if ($user->company->id == Auth::user()->company->id) {
            $user->delete();
        }
    }
}
