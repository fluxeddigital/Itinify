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

Route::view('/app/{path?}', 'app')->where('path', '(.*)')->name('app')->middleware(['auth', 'verified', 'company']);

Route::get('/onboarding', 'GeneralController@onboarding')->name('onboarding')->middleware(['auth', 'verified', 'company.none']);
Route::get('/attach', 'GeneralController@attach')->name('attach')->middleware(['auth', 'verified', 'company.none']);
Route::view('/companies/create', 'companies.create')->name('companies.create');

Route::get('/invoices/{id}', 'GeneralController@invoice');

Route::get('/portal', 'PortalController@search')->name('portal.search');
Route::post('/portal', 'PortalController@index')->name('portal.index');
Route::get('/portal/client/{client}/package/{id}', 'PortalController@show')->name('portal.show');
Route::patch('/portal/client/{client}/package/{id}', 'PortalController@update')->name('portal.update');
Route::patch('/portal/client/{client}/package/{id}/accept', 'PortalController@accept')->name('portal.accept');

Route::get('/format', function () {
    $clients = App\Client::all();

    foreach ($clients as $client) {
        $address = [];

        if ($client->business_address_line_1) {
            $address[] = $client->business_address_line_1;
        }

        if ($client->business_address_line_2) {
            $address[] = $client->business_address_line_2;
        }
        
        if ($client->business_address_line_3) {
            $address[] = $client->business_address_line_3;
        }
        
        if ($client->business_address_town) {
            $address[] = $client->business_address_town;
        }
        
        if ($client->business_address_county) {
            $address[] = $client->business_address_county;
        }
        
        if ($client->business_address_postcode) {
            $address[] = $client->business_address_postcode;
        }

        $client->address = $address;
        
        // if ($client->interests) {
        //     $client->interests = [
        //         $client->interests
        //     ];
        // }

        if ($client->contact_name) {
            $client->contacts = [
                [
                    'name' => $client->contact_name,
                    'birth' => $client->date_of_birth,
                    'email' => $client->contact_email,
                    'mobile' => $client->contact_mobile,
                    'phone' => $client->contact_phone,
                ],
            ];
        }

        $client->save();
    };

    $companies = App\Company::all();

    foreach ($companies as $company) {
        $address = [];

        if ($company->address_line_1) {
            $address[] = $company->address_line_1;
        }

        if ($company->address_line_2) {
            $address[] = $company->address_line_2;
        }
        
        if ($company->address_line_3) {
            $address[] = $company->address_line_3;
        }
        
        if ($company->address_town) {
            $address[] = $company->address_town;
        }
        
        if ($company->address_county) {
            $address[] = $company->address_county;
        }
        
        if ($company->address_postcode) {
            $address[] = $company->address_postcode;
        }

        $company->address = $address;

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

        // if ($company->mailchimp) {
        //     $company->mailchimp = [
        //         'apiKey' => $company->mailchimp,
        //     ];
        // }

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

        // if ($event->newsletter) {
        //     $event->newsletter = [
        //         'mailchimp' => [
        //             'list' => $event->newsletter,
        //         ],
        //     ];
        // }

        $event->save();
    };

    $notes = App\Note::all();

    foreach ($notes as $note) {
        if ($note->client_id) {
            $note->notable_id = $note->client_id;
            $note->notable_type = 'App\Client';
        } else {
            if ($note->package_id) {
                $note->notable_id = $note->package_id;
                $note->notable_type = 'App\Package';
            }
        }

        $note->save();
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

        $package->save();
    };
});