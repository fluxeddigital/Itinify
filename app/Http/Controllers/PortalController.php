<?php

namespace App\Http\Controllers;

use App\Client;
use App\Company;
Use App\Item;
use App\Package;
use Illuminate\Support\Carbon;
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
     * Send the specified resource an id reminder email.
     *
     * @param  int  $email
     * @return \Illuminate\Http\Response
     */
    public function clientSendIdReminder($email)
    {
        $client = Client::where('email', $email)->firstOrFail();

        if ($client) {
            // DANH send id reminder email to $client->email
        };
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

            return view('portal.packages.show', ['package' => $package]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $clientId
     * @param  int  $clientEmail
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function packageUpdate(Request $request, $clientId, $clientEmail, $id)
    {
        $package = Package::findOrFail($id);

        if ($package->client->id == $client) {
            $package->requirements = $request->input('requirements');

            if ($request->input('accepted_by')) {
                $package->accepted_at = Carbon::now();
                $package->accepted_by = $request->input('accepted_by');
                $package->status = 'Accepted';

                // DANH send package accepted emails to $package->client->email and $package->company->email
            } elseif ($request->input('declined')) {
                $package->status = 'Declined';

                // DANH send package declined emails to $package->client->email and $package->company->email
            };
            
            $package->save();
			
			return redirect()->route('portal.packages.show', ['clientId' => $package->client_id, 'clientEmail' => $package->client->email, 'id' => $package->id]);
        }

        abort(404);
    }
}
