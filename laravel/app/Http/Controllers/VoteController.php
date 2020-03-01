<?php

namespace App\Http\Controllers;

use App\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $votes = Vote::where(['id' => Auth::user()->id])->get();
      return response()->json([
        'votes' => $votes,
      ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $this->validate($request, [
        'vote'  => 'required',
        'address' => 'required',
        'signature' => 'required',
      ]);
      $vote = Vote::create([
        'vote' =>  request('vote'),
        'address' => request('address'),
        'signature' => request('signature'),
        'user_id' => Auth::user()->id
      ]);
      return response()->json([
        'vote' => $vote,
        'message' => 'Success!'
      ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function show(Vote $vote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function edit(Vote $vote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vote $vote)
    {
      $this->validate($request, [
        'vote'  => 'required',
        'address' => 'required',
        'signature' => 'required',
      ]);
      $vote->vote = request('vote');
      $vote->address = request('address');
      $vote->signature = request('signature');
      $vote->save();
      return response()->json([
        'message' => 'Vote cast successfully!'
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vote $vote)
    {
      return response()->json([
          'message' => 'Vote deleted successfully'
      ], 200);
    }

    public function __construct()
    {
      $this->middleware('auth');
    }
}
