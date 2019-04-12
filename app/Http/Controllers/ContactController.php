<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Resources\Contact as ContactResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ContactController extends Controller
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

        $contact = Contact::create([
            'company_id' => Auth::user()->company->id,
            'client_id' => $request->input('client_id'),
            'name' => $request->input('name'),
            'birth' => $request->input('birth'),
            'email' => $request->input('email'),
            'mobile' => $request->input('mobile'),
            'phone' => $request->input('phone'),
        ]);
		
		return new ContactResource($contact);
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

        $contact = Contact::findOrFail($id);

        if ($contact->company->id == Auth::user()->company->id) {
            $contact->name = $request->input('name');
            $contact->birth = $request->input('birth');
            $contact->email = $request->input('email');
            $contact->mobile = $request->input('mobile');
            $contact->phone = $request->input('phone');

            $contact->save();
		
            return new ContactResource($contact);
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
        $contact = Contact::findOrFail($id);

        if ($contact->company->id == Auth::user()->company->id) {
            $contact->delete();
        }
    }
}
