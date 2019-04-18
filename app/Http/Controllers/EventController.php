<?php

namespace App\Http\Controllers;

use App\Event;
use App\Http\Resources\Event as EventResource;
use App\Http\Resources\Events as EventsResource;
use \DrewM\MailChimp\MailChimp;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EventController extends Controller
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
        return new EventsResource(Auth::user()->company->events);
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

        $event = Event::create([
            'company_id' => Auth::user()->company->id,
            'name' => $request->input('name'),
            'banner' => $request->input('banner'),
            'conditions' => $request->input('conditions'),
            'dates' => $request->input('dates'),
            'description' => $request->input('description'),
            'location' => $request->input('location'),
            'logo' => $request->input('logo'),
            'newsletter' => $request->input('newsletter'),
            'pack' => $request->input('pack'),
        ]);
		
		// if (! $event->company->payment->free) {
        // 	$event->company->subscription('main')->incrementQuantity();
        // };

        if (! $event->newsletter['mailchimp']['list'] && Auth::user()->company->mailchimp['apiKey']) {
            // $mailchimp = new MailChimp(Auth::user()->company->mailchimp['apiKey']);

            // $list = $mailchimp->post('lists', [
            //     'name' => $event->name,
            //     'contact' => [
            //         'company' => $event->company->name,
            //         'address1' => $event->company->address['streetNumber'] . ' ' . $event->company->address['route'],
            //         'city' => $event->company->address['postalTown'],
            //         'country' => $event->company->address['country'],
            //         'phone' => $event->company['phone'],
            //         'state' => $event->company->address['administrativeAreaLevel2'],
            //         'zip' => $event->company->address['postalCode'],
            //     ],
            //     'campaign_defaults' => [
            //         'from_name' => $event->company->name,
            //         'from_email' => $event->company->email,
            //         'subject' => $event->name,
            //         'language' => 'en'
            //     ],
            //     'permission_reminder' => 'Itinify Event',
            //     'email_type_option' => false
            // ]);

            // $event->newsletter = [
            //     'mailchimp' => [
            //         'list' => $list['id'],
            //     ],
            // ];

            // $event->save();
        };

        return new EventResource($event);
    }

    /**
     * Return a specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        if ($event->company->id == Auth::user()->company->id) {
            return new EventResource($event);
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
        ]);
        
        $event = Event::findOrFail($id);

        if ($event->company->id == Auth::user()->company->id) {
            $event->name = $request->input('name');
            $event->banner = $request->input('banner');
            $event->conditions = $request->input('conditions');
            $event->dates = $request->input('dates');
            $event->description = $request->input('description');
            $event->location = $request->input('location');
            $event->logo = $request->input('logo');
            $event->newsletter = $request->input('newsletter');
            $event->pack = $request->input('pack');

            $event->save();

            return new EventResource($event);
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
        $event = Event::findOrFail($id);

        if ($event->company->id == Auth::user()->company->id) {
            foreach ($event->items as $item) {
                $item->event_id = null;
                $item->save();
            };

            foreach ($event->packages as $package) {
                $package->event_id = null;
                $package->save();
            };

			// if (! $event->company->payment->free) {
            // 	$event->company->subscription('main')->decrementQuantity();
			// };

            $event->delete();
        };
    }
};
