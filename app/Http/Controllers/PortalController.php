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
