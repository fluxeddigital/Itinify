<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class GeneralController extends Controller
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
     * Show the application attachment.
     *
     * @return \Illuminate\Http\Response
     */
    public function attach()
    {
        return view('users.attach');
    }

    /**
     * Download an invoice.
     *
     * @return \Illuminate\Http\Response
     */
    public function invoice($id)
    {
        return Auth::user()->company->downloadInvoice($id, [
            'vendor'  => 'Itinify',
            'product' => 'Itinify',
        ]);
    }

    /**
     * Show the application onboarding.
     *
     * @return \Illuminate\Http\Response
     */
    public function onboarding()
    {
        return view('onboarding');
    }
}
