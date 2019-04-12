<?php

namespace App\Http\Controllers;

use App\Client;
use App\Company;
Use App\Item;
use App\Package;
use App\Mail\ClientPackageAccepted;
use App\Mail\CompanyPackageAccepted;
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
     * Search a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search()
    {
        return view('portal.search');
    }

    /**
     * Return a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->validate([
            'client_id' => 'required|integer',
            'email' => 'required|string|email',
        ]);

        $client = Client::where([['id', $request->client_id], ['contact_email', $request->email]])->firstOrFail();

        return view('portal.index', ['packages' => $client->packages]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $client
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($client, $id)
    {
        $package = Package::findOrFail($id);
		
		if (! $package->client) {
			abort(404);
		}

        if ($package->client->id == $client) {
            return view('portal.show', ['package' => $package]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $client
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $client, $id)
    {
        $package = Package::findOrFail($id);

        if ($package->client->id == $client) {
            $package->special_requirements = $request->input('special_requirements');
            $package->dietary_requirements = $request->input('dietary_requirements');
			
            $package->save();
			
			return redirect()->route('portal.show', ['client' => $client, 'id' => $id]);
        }

        abort(404);
    }

    /**
     * Accept the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $client
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function accept(Request $request, $client, $id)
    {
        $package = Package::findOrFail($id);

        if ($package->client->id == $client) {
            $package->accepted_at = Carbon::now();
            $package->accepted_by = $request->input('accepted_by');
            $package->status = 'accepted';
			
            $package->save();
            
            Mail::to($package->client->contact_email)->send(new ClientPackageAccepted($package));
            Mail::to($package->company->email)->send(new CompanyPackageAccepted($package));
			
			return redirect()->route('portal.show', ['client' => $client, 'id' => $id]);
        }

        abort(404);
    }
}
