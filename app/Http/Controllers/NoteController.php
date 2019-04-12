<?php

namespace App\Http\Controllers;

use App\Note;
use App\Http\Resources\Note as NoteResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class NoteController extends Controller
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
            'title' => 'required',
        ]);

        $note = Note::create([
            'company_id' => Auth::user()->company->id,
            'notable_id' => $request->input('notable_id'),
            'notable_type' => $request->input('notable_type'),
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'reminder' => $request->input('reminder'),
            'visibility' => $request->input('visibility'),
        ]);
		
		return new NoteResource($note);
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
            'title' => 'required',
        ]);

        $note = Note::findOrFail($id);

        if ($note->company->id == Auth::user()->company->id) {
            $note->title = $request->input('title');
            $note->content = $request->input('content');
            $note->reminder = $request->input('reminder');
            $note->visibility = $request->input('visibility');

            $note->save();
		
            return new NoteResource($note);
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
        $note = Note::findOrFail($id);

        if ($note->company->id == Auth::user()->company->id) {
            $note->delete();
        }
    }
}
