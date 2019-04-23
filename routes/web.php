<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['verify' => true]);

Route::view('/companies/create', 'companies.create')->name('companies.create')->middleware(['auth', 'verified', 'company.none']);

Route::view('/app/{path?}', 'app')->where('path', '(.*)')->name('app')->middleware(['auth', 'verified', 'company']);

Route::get('/invoices/{id}', 'AppController@invoice')->name('app.invoice');

Route::get('/portal/clients', 'PortalController@clientsIndex')->name('portal.clients.index');
Route::get('/portal/clients/{id}/{email}', 'PortalController@clientShow')->name('portal.clients.show');
Route::get('/portal/clients/{clientId}/{clientEmail}/packages/{id}', 'PortalController@packageShow')->name('portal.packages.show');
Route::patch('/portal/clients/{clientId}/{clientEmail}/packages/{id}', 'PortalController@packageUpdate')->name('portal.packages.update');

Route::get('/format', function () {
    // $notes = App\Note::all();

    // foreach ($notes as $note) {
    //     if ($note->client_id) {
    //         $client = App\Client::find($note->client_id);

    //         if ($client) {
    //             $client->notes = [
    //                 [
    //                     'title' => $note->title,
    //                     'content' => $note->content,
    //                 ],
    //             ];

    //             $client->save();
    //         };
    //     } else {
    //         if ($note->package_id) {
    //             if ($note->visibility) {
    //                 $note->visibility = true;
    //             } else {
    //                 $note->visibility = false;
    //             };

    //             $package = App\Package::find($note->package_id);

    //             if ($package) {
    //                 $package->notes = [
    //                     [
    //                         'title' => $note->title,
    //                         'content' => $note->content,
    //                         'visibility' => $note->visibility,
    //                     ],
    //                 ];

    //                 $package->save();
    //             };
    //         }
    //     }

    //     $note->save();
    // };

    $clients = App\Client::all();

    foreach ($clients as $client) {
        $address = [];

        if ($client->business_address_line_1) {
            $address['line1'] = $client->business_address_line_1;
        } else {
            $address['line1'] = null;
        }

        if ($client->business_address_line_2) {
            $address['line2'] = $client->business_address_line_2;
        }
        
        if ($client->business_address_line_3) {
            $address['line3'] = $client->business_address_line_3;
        }
        
        if ($client->business_address_town) {
            $address['city'] = $client->business_address_town;
        }
        
        if ($client->business_address_county) {
            $address['county'] = $client->business_address_county;
        }
        
        if ($client->business_address_postcode) {
            $address['postcode'] = $client->business_address_postcode;
        }

        $client->address = $address;
        
        if (is_string($client->interests)) {
            $client->interests = [
                $client->interests
            ];
        } else if (! $client->interests) {
            $client->interests = [];
        };

        $client->contacts = [
            [
                'name' => $client->contact_name,
                'birth' => $client->date_of_birth,
                'email' => $client->contact_email,
                'mobile' => $client->contact_mobile,
                'phone' => $client->contact_phone,
            ],
        ];

        $client->save();
    };

    $companies = App\Company::all();

    foreach ($companies as $company) {
        $address = [];

        if ($company->address_line_1) {
            $address['line1'] = $company->address_line_1;
        } else {
            $address['line1'] = null;
        }

        if ($company->address_line_2) {
            $address['line2'] = $company->address_line_2;
        }
        
        if ($company->address_line_3) {
            $address['line3'] = $company->address_line_3;
        }
        
        if ($company->address_town) {
            $address['city'] = $company->address_town;
        }
        
        if ($company->address_county) {
            $address['county'] = $company->address_county;
        }
        
        if ($company->address_postcode) {
            $address['postcode'] = $company->address_postcode;
        }

        if (sizeof($address)) {
            $company->address = $address;
        } else {
            $company->address = null;
        }

        if ($company->custom_css) {
            $custom_css = $company->custom_css;
        } else {
            $custom_css = null;
        }

        if ($company->tracking_code) {
            $tracking_code = $company->tracking_code;
        } else {
            $tracking_code = null;
        }

        $company->customisation = [
            'css' => $custom_css,
            'tracking' => $tracking_code,
        ];

        if ($company->feefo_merchant_identifier) {
            $feefo_merchant_identifier = $company->feefo_merchant_identifier;
        } else {
            $feefo_merchant_identifier = null;
        }

        if ($company->feefo_username) {
            $feefo_username = $company->feefo_username;
        } else {
            $feefo_username = null;
        }

        if ($company->feefo_password) {
            $feefo_password = $company->feefo_password;
        } else {
            $feefo_password = null;
        }

        if ($company->feefo_api_key) {
            $feefo_api_key = $company->feefo_api_key;
        } else {
            $feefo_api_key = null;
        }

        $company->feefo = [
            'apiKey' => $feefo_api_key,
            'merchantIdentifier' => $feefo_merchant_identifier,
            'password' => $feefo_password,
            'username' => $feefo_username,
        ];

        if (is_string($company->mailchimp)) {
            $company->mailchimp = [
                'apiKey' => $company->mailchimp,
            ];
        } else {
            $company->mailchimp = [
                'apiKey' => null,
            ];
        }

        if ($company->nexmo_key) {
            $nexmo_key = $company->nexmo_key;
        } else {
            $nexmo_key = null;
        }

        if ($company->nexmo_secret) {
            $nexmo_secret = $company->nexmo_secret;
        } else {
            $nexmo_secret = null;
        }

        if ($company->nexmo_sms_from) {
            $nexmo_sms_from = $company->nexmo_sms_from;
        } else {
            $nexmo_sms_from = null;
        }

        $company->nexmo = [
            'key' => $nexmo_key,
            'secret' => $nexmo_secret,
            'smsFrom' => $nexmo_sms_from,
        ];

        $company->save();
    };

    $events = App\Event::all();

    foreach ($events as $event) {
        if ($event->start_date) {
            $start_date = $event->start_date;
        } else {
            $start_date = null;
        }

        if ($event->end_date) {
            $end_date = $event->end_date;
        } else {
            $end_date = null;
        }

        $event->dates = [
            'ends' => $end_date,
            'starts' => $start_date,
        ];

        if (is_string($event->newsletter)) {
            $event->newsletter = [
                'mailchimp' => [
                    'list' => $event->newsletter,
                ],
            ];
        } else {
            $event->newsletter = [
                'mailchimp' => [
                    'list' => null,
                ],
            ];
        }

        $event->save();
    };

    $packages = App\Package::all();

    foreach ($packages as $package) {
        if ($package->banner_image) {
            $banner_image = $package->banner_image;
        } else {
            $banner_image = null;
        }

        if ($package->description) {
            $description = $package->description;
        } else {
            $description = null;
        }

        if ($package->welcome_text) {
            $welcome_text = $package->welcome_text;
        } else {
            $welcome_text = null;
        }

        $package->customisation = [
            'banner' => $banner_image,
            'description' => $description,
            'welcome' => $welcome_text,
        ];
        
        if ($package->price_per_person) {
            $price_per_person = $package->price_per_person;
        } else {
            $price_per_person = null;
        }

        if ($package->total_price) {
            $total_price = $package->total_price;
        } else {
            $total_price = null;
        }

        if ($package->vat) {
            $vat = $package->vat;
        } else {
            $vat = null;
        }

        $package->documents = [];

        $package->pricing = [
            'person' => $price_per_person,
            'total' => $total_price,
            'vat' => $vat,
        ];

        if ($package->special_requirements) {
            $special_requirements = $package->special_requirements;
        } else {
            $special_requirements = null;
        }

        if ($package->dietary_requirements) {
            $dietary_requirements = $package->dietary_requirements;
        } else {
            $dietary_requirements = null;
        }

        $package->requirements = [
            'dietary' => $dietary_requirements,
            'other' => $special_requirements,
        ];

        $car_hire = [];

        if ($package->car_hire) {
            if (array_key_exists('carHire', $package->car_hire)) {
                foreach ($package->car_hire['carHire'] as $hire) {
                    if ($hire['provider']) {
                        if (is_string($hire['provider'])) {
                            $hire['provider'] = strtoupper(substr($hire['provider'], 0, 3));
                        };
                    };

                    $car_hire[] = [
                        'car' => $hire['carType'],
                        'confirmationNumber' => $hire['confirmationNumber'],
                        'description' => $hire['whats_included'],
                        'dropoff' => [
                            'date' => Carbon\Carbon::parse($hire['dropoffDate'])->format('d/m/Y'),
                            'location' => $hire['dropoffLocation'],
                            'time' => $hire['dropoffTime'],
                        ],
                        'pickup' => [
                            'date' => Carbon\Carbon::parse($hire['pickupDate'])->format('d/m/Y'),
                            'location' => $hire['pickupLocation'],
                            'time' => $hire['pickupTime'],
                        ],
                        'provider' => $hire['provider'],
                    ];
                };
            } else {
                $car_hire = $package->car_hire;
            };
        };

        $package->car_hire = $car_hire;

        $flights = [];

        if ($package->flights) {
            if (array_key_exists('flights', $package->flights)) {
                foreach ($package->flights['flights'] as $flight) {
                    $flights[] = [
                        'airline' => $flight['airline'],
                        'arrival' => [
                            'airport' => $flight['arrivalAirport'],
                            'date' => Carbon\Carbon::parse($flight['date'])->format('d/m/Y'),
                            'time' => $flight['arrivalTime'],
                        ],
                        'class' => $flight['class'],
                        'departure' => [
                            'airport' => $flight['departureAirport'],
                            'date' => Carbon\Carbon::parse($flight['date'])->format('d/m/Y'),
                            'time' => $flight['departureTime'],
                        ],
                        'number' => $flight['number'],
                    ];
                };
            } else {
                $flights = $package->flights;
            };
        };

        $package->flights = $flights;

        $itinerary = [];

        if ($package->itinerary) {
            if (array_key_exists('itinerary', $package->itinerary)) {
                foreach ($package->itinerary['itinerary'] as $item) {
                    $itinerary[] = [
                        'date' => Carbon\Carbon::parse($item['date'])->format('d/m/Y'),
                        'description' => [
                            'long' => $item['long_description'],
                            'short' => $item['short_description'],
                        ],
                        'name' => $item['name'],
                    ];
                };
            } else {
                $itinerary = $package->itinerary;
            };
        };

        $package->itinerary = $itinerary;

        $transfers = [];

        if ($package->transfers) {
            if (array_key_exists('transfers', $package->transfers)) {
                foreach ($package->transfers['transfers'] as $transfer) {
                    $transfers[] = [
                        'date' => null,
                        'description' => [
                            'long' => $transfer['long_description'],
                            'short' => $transfer['short_description'],
                        ],
                        'name' => $transfer['name'],
                    ];
                };
            } else {
                $transfers = $package->transfers;
            };
        };

        $package->transfers = $transfers;

        $passengers = [];

        if ($package->passengers) {
            if (array_key_exists('passengers', $package->passengers)) {
                foreach ($package->passengers['passengers'] as $passenger) {
                    $passengers[] = [
                        'names' => [
                            'first' => $passenger['firstName'],
                            'last' => $passenger['lastName'],
                        ],
                        'birth' => '',
                    ];
                };
            } else {
                $passengers = $package->passengers;
            };
        };

        $package->passengers = $passengers;

        $package->restaurants = [];

        if (! $package->notes) {
            $package->notes = [];
        };

        $package->save();
    };
});