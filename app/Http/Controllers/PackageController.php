<?php

namespace App\Http\Controllers;

use App\Client;
use App\Event;
use App\Package;
use App\Http\Resources\Package as PackageResource;
use App\Mail\NewPackage;
use \DrewM\MailChimp\MailChimp;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class PackageController extends Controller
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
        return PackageResource::collection(Auth::user()->company->packages);
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
            'title' => 'required',
        ]);

        $client = Event::find($request->input('client_id'));

        if ($client && ! $client->company_id == Auth::user()->company_id) {
            return null;
        }

        $event = Event::find($request->input('event_id'));

        if ($event && ! $event->company_id == Auth::user()->company_id) {
            return null;
        }

        if (Auth::user()->company->mailchimp->apiKey && $event->newsletter->mailchimp->list && $client->email) {
            $mailchimp = new MailChimp(Auth::user()->company->mailchimp_api_key);

            $mailchimp->post('lists/' . $event->newsletter->mailchimp->list . '/members', [
                'email_address' => $client->email,
                'status'        => 'subscribed',
                'merge_fields' => [
                    'FNAME' => $client->name,
                ],
            ]);
        }

        $package = Package::create([
            'title' => $request->input('title'),
            'company_id' => Auth::user()->company->id,
            'client_id' => $request->input('client_id'),
            'event_id' => $request->input('event_id'),
        ]);

        if ($client->email) {
            Mail::to($client->email)->send(new NewPackage($package));
        }

        return new PackageResource($package);
    }

    /**
     * Return a specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $package = Package::findOrFail($id);

        if ($package->company->id == Auth::user()->company->id) {
            return new PackageResource($package);
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
            'title' => 'required',
        ]);
        
        if ($request->input('client_id')) {
            $client = Client::findOrFail($request->input('client_id'));

            if (! $client->company->id == Auth::user()->company->id) {
                return null;
            }
        }

        if ($request->input('event_id')) {
            $event = Event::findOrFail($request->input('event_id'));

            if (! $event->company->id == Auth::user()->company->id) {
                return null;
            }
        }

        $package = Package::findOrFail($id);

        $mailchimpSubscriberDeleted = false;
		
		if ($request->input('client_id')) {
			if ($package->client_id) {
				if ($request->input('client_id') != $package->client->id) {
					if (Auth::user()->company->mailchimp_api_key && $event->mailchimp_list_id) {
						$mailchimp = new MailChimp(Auth::user()->company->mailchimp_api_key);

						$mailchimp->delete('lists/' . $event->newsletter->mailchimp->list . '/members/' . $mailchimp->subscriberHash('$client->email'));

						$mailchimpSubscriberDeleted = true;
					}
				}
			} else {
				if (Auth::user()->company->mailchimp_api_key && $event->mailchimp_list_id) {
					$mailchimp = new MailChimp(Auth::user()->company->mailchimp_api_key);

					$mailchimp->delete('lists/' . $event->newsletter->mailchimp->list . '/members/' . $mailchimp->subscriberHash('$client->email'));

					$mailchimpSubscriberDeleted = true;
				}
			}
		}

        if ($package->company->id == Auth::user()->company->id) {
            if ($package->status == 'accepted') {
                $status = 'accepted';
            } else {
                $status = $request->input('status');
            }

            $package->client_id = $request->input('client_id');
            $package->event_id = $request->input('event_id');
            $package->title = $request->input('title');
            $package->car_hire = $request->input('car_hire');
            $package->customisation = $request->input('customisation');
            $package->expires = $request->input('expires');
            $package->flights = $request->input('flights');
            $package->issued = $request->input('issued');
            $package->itinerary = $request->input('itinerary');
            $package->lead_status = $request->input('lead_status');
            $package->passengers = $request->input('passengers');
            $package->pricing = $request->input('pricing');
            $package->reminder = $request->input('reminder');
            $package->requirements = $request->input('requirements');
            $package->restaurants = $request->input('restaurants');
            $package->status = $request->input('status');
            $package->transfers = $request->input('transfers');

            $package->save();

            if (Auth::user()->company->mailchimp->apiKey && $event->newsletter->mailchimp->list && $client->email) {
                $mailchimp = new MailChimp(Auth::user()->company->mailchimp->apiKey);
    
                $mailchimp->post('lists/' . $event->newsletter->mailchimp->list . '/members', [
                    'email_address' => $client->email,
                    'status'        => 'subscribed',
                    'merge_fields' => [
                        'FNAME' => $client->name,
                    ],
                ]);
            }

            return new PackageResource($package);
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
        $package = Package::findOrFail($id);

        if ($package->company->id == Auth::user()->company->id) {
            $package->delete();
        }
    }
}
