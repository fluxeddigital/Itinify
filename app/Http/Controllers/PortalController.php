<?php

namespace App\Http\Controllers;

use App\Client;
use App\Company;
Use App\Item;
use App\Package;
use \Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class PortalController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Search clients.
     *
     * @return \Illuminate\Http\Response
     */
    public function clientsIndex()
    {
        return view('portal.clients.index');
    }

    /**
     * Display a client.
     *
     * @return \Illuminate\Http\Response
     */
    public function clientShow($id, $email)
    {
        $client = Client::where([['id', $id], ['email', $email]])->firstOrFail();

        return view('portal.clients.show', ['client' => $client]);
    }

    /**
     * Display a package.
     *
     * @return \Illuminate\Http\Response
     */
    public function packageShow($clientId, $clientEmail, $id)
    {
        $package = Package::findOrFail($id);

        $client = Client::where([['id', $clientId], ['email', $clientEmail]])->firstOrFail();

        if ($package->client_id == $clientId) {
            $itinerary = [];

            foreach ($package->itinerary as $item) {
                if (array_key_exists('date', $item)) {
                    if ($item->date) {
                        $itinerary[Carbon::createFromFormat('d/m/Y', $item->date)->format('Y-m-d')] = [];
                    };
                };
            };

            foreach ($package->flights as $item) {
                if (array_key_exists('departure', $item)) {
                    if (array_key_exists('date', $item->departure)) {
                        if ($item->departure->date) {
                            $itinerary[Carbon::createFromFormat('d/m/Y', $item->departure->date)->format('Y-m-d')] = [];
                        };
                    };
                };
            };

            foreach ($package->transfers as $item) {
                if (array_key_exists('date', $item)) {
                    if ($item->date) {
                        $itinerary[Carbon::createFromFormat('d/m/Y', $item->date)->format('Y-m-d')] = [];
                    };
                };
            };

            foreach ($package->car_hire as $item) {
                if (array_key_exists('dropoff', $item)) {
                    if (array_key_exists('date', $item->dropoff)) {
                        if ($item->dropoff->date) {
                            $itinerary[Carbon::createFromFormat('d/m/Y', $item->dropoff->date)->format('Y-m-d')] = [];
                        };
                    };
                };

                if (array_key_exists('pickup', $item)) {
                    if (array_key_exists('date', $item->pickup)) {
                        if ($item->pickup->date) {
                            $itinerary[Carbon::createFromFormat('d/m/Y', $item->pickup->date)->format('Y-m-d')] = [];
                        };
                    };
                };
            };

            ksort($itinerary);

            foreach ($package->itinerary as $item) {
                if (array_key_exists('date', $item)) {
                    if ($item->date) {
                        $itinerary[Carbon::createFromFormat('d/m/Y', $item->date)->format('Y-m-d')][] = [
                            'item' => $item,
                            'type' => 'item',
                        ];
                    };
                };
            };

            foreach ($package->flights as $item) {
                if (array_key_exists('departure', $item)) {
                    if (array_key_exists('date', $item->departure)) {
                        if ($item->departure->date) {
                            $itinerary[Carbon::createFromFormat('d/m/Y', $item->departure->date)->format('Y-m-d')][] = [
                                'item' => $item,
                                'type' => 'flight',
                            ];
                        };
                    };
                };
            };

            foreach ($package->transfers as $item) {
                if (array_key_exists('date', $item)) {
                    if ($item->date) {
                        $itinerary[Carbon::createFromFormat('d/m/Y', $item->date)->format('Y-m-d')][] = [
                            'item' => $item,
                            'type' => 'transfer',
                        ];
                    };
                };
            };

            foreach ($package->car_hire as $item) {
                if (array_key_exists('dropoff', $item)) {
                    if (array_key_exists('date', $item->dropoff)) {
                        if ($item->dropoff->date) {
                            $itinerary[Carbon::createFromFormat('d/m/Y', $item->dropoff->date)->format('Y-m-d')][] = [
                                'item' => $item,
                                'type' => 'carHire.dropoff',
                            ];
                        };
                    };
                };

                if (array_key_exists('pickup', $item)) {
                    if (array_key_exists('date', $item->pickup)) {
                        if ($item->pickup->date) {
                            $itinerary[Carbon::createFromFormat('d/m/Y', $item->pickup->date)->format('Y-m-d')][] = [
                                'item' => $item,
                                'type' => 'carHire.pickup',
                            ];
                        };
                    };
                };
            };

            $package->itinerary = $itinerary;

            dd($package->itinerary);

            return view('portal.packages.show', ['package' => $package]);
        }
    }

    // DANH merge updates into packageUpdate()
    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $client
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, $client, $id)
    // {
    //     $package = Package::findOrFail($id);

    //     if ($package->client->id == $client) {
    //         $package->special_requirements = $request->input('special_requirements');
    //         $package->dietary_requirements = $request->input('dietary_requirements');
			
    //         $package->save();
			
	// 		return redirect()->route('portal.show', ['client' => $client, 'id' => $id]);
    //     }

    //     abort(404);
    // }

    // /**
    //  * Accept the specified resource.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $client
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function accept(Request $request, $client, $id)
    // {
    //     $package = Package::findOrFail($id);

    //     if ($package->client->id == $client) {
    //         $package->accepted_at = Carbon::now();
    //         $package->accepted_by = $request->input('accepted_by');
    //         $package->status = 'accepted';
			
    //         $package->save();
            
    //         DANH send package accepted emails to $package->client->email and $package->company->email
			
	// 		return redirect()->route('portal.show', ['client' => $client, 'id' => $id]);
    //     }

    //     abort(404);
    // }
}
