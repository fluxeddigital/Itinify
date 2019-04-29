<?php

namespace App\Http\Controllers;

use App\Company;
use App\User;

use App\Http\Resources\Company as CompanyResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class CompanyController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
        $this->middleware('company')->except('store');
        $this->middleware('company.none')->only('store');
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
            'email' => 'required',
        ]);

        $company = Company::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);
		
		if ($request->free) {
			$company->free = 1;
			
			$company->save();
		}
        
		if (! $company->free) {
            if ($request->input('stripe_token')) {
                $company->newSubscription('main', env('STRIPE_PLAN_ID'))->trialDays(30)->create($request->input('stripe_token'));
                $company->subscription('main')->updateQuantity(0);
                $company->invoiceFor('Setup Fee', 30000);
            } else {
                $company->delete();

                return redirect()->route('companies.create');
            };
		}

        Auth::user()->company_id = $company->id;
        Auth::user()->save();

        // DANH send welcome email to $company->email

        return redirect()->route('app');
    }

    /**
     * Return a specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $company = Company::findOrFail($id);

        if ($id == Auth::user()->company_id) {
            return new CompanyResource($company);
        }
    }

    /**
     * Return a specified resource's invoices.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function invoices($id)
    {
        $company = Company::findOrFail($id);

        if ($id == Auth::user()->company_id) {
            if ($company->stripe_id) {
                $invoices = [];

                foreach ($company->invoicesIncludingPending() as $invoice) {
                    $invoices[] = [
                        'id' => $invoice->id,
                        'amount' => $invoice->total(),
                        'date' => $invoice->date()->toFormattedDateString(),
                    ];
                };

                return $invoices;
            } else {
                return [];
            };
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
            'name' => 'required',
            'email' => 'required',
        ]);
        
        $company = Company::findOrFail($id);

        if ($id == Auth::user()->company->id) {
            $company->name = $request->input('name');
            $company->about = $request->input('about');
            $company->address = $request->input('address');
            $company->customisation = $request->input('customisation');
            $company->email = $request->input('email');
            $company->emails = $request->input('emails');
            $company->feefo = $request->input('feefo');
            $company->industry = $request->input('industry');
            $company->logo = $request->input('logo');
            $company->mailchimp = $request->input('mailchimp');
            $company->nexmo = $request->input('nexmo');
            $company->phone = $request->input('phone');
            $company->vat_number = $request->input('vat_number');
            
            if (! $company->free) {
                if ($request->input('stripe_token')) {
                    $company->updateCard($request->input('stripe_token'));
                };
            };
            
            $company->save();

            return new CompanyResource($company);
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
        if ($id == Auth::user()->company->id) {
            $company = Company::findOrFail($id);

            $company->clients->delete();

            $company->events->delete();

            $company->items->delete();
            
            $company->item_categories->delete();

            $company->packages->delete();

            $company->users->delete();
			
			if (! $company->free) {
            	$company->subscription('main')->cancel();
			}

            $company->delete();

            return redirect()->route('register');
        }
    }
}
