<?php

namespace App\Http\Controllers;

use App\Client;
use App\Http\Resources\Client as ClientResource;
use App\Event;
use App\Notifications\SMS;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\Request;

class ClientController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ClientResource::collection(Auth::user()->company->clients);
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

        $client = Client::create([
            'company_id' => Auth::user()->company->id,
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'contacts' => $request->input('contacts'),
            'email' => $request->input('email'),
            'interests' => $request->input('interests'),
            'logo' => $request->input('logo'),
            'notes' => $request->input('notes'),
            'phone' => $request->input('phone'),
            'status' => $request->input('status'),
        ]);

        // DANH send welcome email to $client->email

        return new ClientResource($client);
    }

    /**
     * Return a specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $client = Client::findOrFail($id);

        if ($client->company->id == Auth::user()->company->id) {
            return new ClientResource($client);
        }
    }

    /**
     * Send the specified resource a welcome email.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function sendWelcomeEmail($id)
    {
        $client = Client::findOrFail($id);

        if ($client->company->id == Auth::user()->company->id) {
            // DANH send welcome email to $client->email
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
        
        $client = Client::findOrFail($id);

        if ($client->company->id == Auth::user()->company->id) {
            $client->name = $request->input('name');
            $client->address = $request->input('address');
            $client->contacts = $request->input('contacts');
            $client->email = $request->input('email');
            $client->interests = $request->input('interests');
            $client->logo = $request->input('logo');
            $client->notes = $request->input('notes');
            $client->phone = $request->input('phone');
            $client->status = $request->input('status');

            $client->save();

            return new ClientResource($client);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id);

        if ($client->company->id == Auth::user()->company->id) {
            $client->delete();
        }
    }
}
