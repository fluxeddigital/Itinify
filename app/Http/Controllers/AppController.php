<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AppController extends Controller
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
     * Return search results.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $company = Auth::user()->company;

        if ($request->input('query')) {
            $packagesResults = $company->packages()->where('title', 'LIKE', '%' . $request->input('query') . '%')->get();
            $clientsResults = $company->clients()->where('name', 'LIKE', '%' . $request->input('query') . '%')->get();
            $eventsResults = $company->events()->where('name', 'LIKE', '%' . $request->input('query') . '%')->get();

            foreach ($clientsResults as $client) {
                foreach ($client->packages as $package) {
                    if (! $packagesResults->contains('id', $package->id)) {
                        $packagesResults[] = $package;
                    };
                };
            };

            foreach ($eventsResults as $event) {
                foreach ($event->packages as $package) {
                    if (! $packagesResults->contains('id', $package->id)) {
                        $packagesResults[] = $package;
                    };
                };
            };

            $packages = [];

            foreach ($packagesResults->sortByDesc('created_at') as $package) {
                $packages[] = [
                    'id' => $package->id,
                    'title' => $package->title,
                    'client' => [
                        'id' => $package->client_id,
                        'name' => $package->client_name,
                    ],
                    'event' => [
                        'id' => $package->event_id,
                        'name' => $package->event_name,
                        'starts' => Carbon::parse($package->event_starts)->format('d/m/Y'),
                        'ends' => Carbon::parse($package->event_ends)->format('d/m/Y'),
                    ],
                ];
            };

            $clients = [];

            foreach ($clientsResults->sortByDesc('created_at') as $client) {
                $clients[] = [
                    'id' => $client->id,
                    'name' => $client->name,
                    'logo' => $client->logo,
                ];
            };

            $events = [];

            foreach ($eventsResults->sortByDesc('created_at') as $event) {
                $events[] = [
                    'id' => $event->id,
                    'name' => $event->name,
                    'starts' => Carbon::parse($event->starts)->format('d/m/Y'),
                    'ends' => Carbon::parse($event->ends)->format('d/m/Y'),
                    'logo' => $event->logo,
                ];
            };

            return [
                'packages' => $packages,
                'clients' => $clients,
                'events' => $events,
            ];
        }
    }

    /**
     * Return all data needed for stats.
     *
     * @return \Illuminate\Http\Response
     */
    public function stats()
    {
        $company = Auth::user()->company;

        $clients = $company->clients;

        $events = $company->events;

        $packages = $company->packages;

        $clientsLast10 = [];

        foreach ($clients->sortByDesc('created_at')->take(10) as $client) {
            $clientsLast10[] = [
                'id' => $client->id,
                'name' => $client->name,
                'created_at' => $client->created_at->format('d/m/Y'),
            ];
        };

        $eventsLast10 = [];

        foreach ($events->sortByDesc('created_at')->take(10) as $event) {
            $eventsLast10[] = [
                'id' => $event->id,
                'name' => $event->name,
                'created_at' => $event->created_at->format('d/m/Y'),
            ];
        };

        $packagesLast10 = [];

        foreach ($packages->sortByDesc('created_at')->take(10) as $package) {
            $packagesLast10[] = [
                'id' => $package->id,
                'title' => $package->title,
                'client' => [
                    'id' => $package->client_id,
                    'name' => $package->client_name,
                ],
                'created_at' => $package->created_at->format('d/m/Y'),
            ];
        };

        $now = Carbon::now();

        $clientsCount = count($clients);

        $clientsCount = [$clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount, $clientsCount];

        foreach ($clients->sortByDesc('created_at') as $client) {
            if ($client->created_at) {
                $difference = $client->created_at->diffInDays($now);

                if ($difference <= 28) {
                    $i = 0;

                    foreach ($clientsCount as $day) {
                        if ($i < (28 - $difference)) {
                            $clientsCount[$i] += -1;
                        };

                        $i += 1;
                    };
                };
            };
        };

        $packagesCount = count($packages);

        $packagesCount = [$packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount, $packagesCount];

        foreach ($packages->sortByDesc('created_at') as $package) {
            $difference = $package->created_at->diffInDays($now);

            if ($difference <= 28) {
                $i = 0;

                foreach ($packagesCount as $day) {
                    if ($i < (28 - $difference)) {
                        $packagesCount[$i] += -1;
                    };

                    $i += 1;
                };
            };
        };

        return [
            'clients' => [
                'count' => $clientsCount,
                'last10' => $clientsLast10,
                'total' => count($clients),
            ],
            'events' => [
                'last10' => $eventsLast10,
                'total' => count($events),
            ],
            'packages' => [
                'count' => $packagesCount,
                'last10' => $packagesLast10,
                'total' => count($packages),
            ],
        ];
    }
}
