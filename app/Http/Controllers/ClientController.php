<?php

namespace App\Http\Controllers;

use App\Client;
use App\Http\Resources\Client as ClientResource;
use App\Event;
use App\Mail\ClientWelcome;
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

        // Mail::to($client->email)->send(new ClientWelcome($client));

        return new ClientResource($client);
    }

    /**
     * Send newly prepared notifications to their recipients.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendNotifications(Request $request)
    {
        if ($request->input('client') && Auth::user()->company->nexmo_key && Auth::user()->company->nexmo_secret && Auth::user()->company->nexmo_sms_from) {
            $recipients = [];

            if ($request->input('client')) {
                $client = Client::findOrFail($request->input('client'));

                if ($client->company->id == Auth::user()->company->id) {
                    if ($client->contact_mobile) {
                        $recipients[] = $client->contact_mobile;
                    }
                }
            } elseif ($request->input('clients')) {
                foreach ($request->input('clients') as $client) {
                    $client = Client::findOrFail($client);

                    if ($client->company->id == Auth::user()->company->id) {
                        if ($client->contact_mobile) {
                            $recipients[] = $client->contact_mobile;
                        }
                    }
                }
            } elseif ($request->input('event')) {
                $event = Event::findOrFail($request->input('event'));

                if ($event->company->id == Auth::user()->company->id) {
                    foreach ($event->packages as $package) {
                        if ($package->status == $request->input('package_scope')) {
                            if ($package->client->company->id == Auth::user()->company->id) {
                                if ($package->client->contact_mobile) {
                                    $recipients[] = $package->client->contact_mobile;
                                }
                            }
                        }
                    }
                }
            }

            config([
                'services.nexmo.key' => Auth::user()->company->nexmo->key,
                'services.nexmo.secret' => Auth::user()->company->nexmo->secret,
                'services.nexmo.sms_from' => Auth::user()->company->nexmo->smsFrom,
            ]);

            foreach ($recipients as $recipient) {
                Notification::route('nexmo', $recipient)
                    ->notify(new SMS($request->input('message')));
            }
        }
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
