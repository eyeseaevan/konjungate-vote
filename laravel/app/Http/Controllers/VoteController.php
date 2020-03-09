<?php

namespace App\Http\Controllers;

use Log;
use App\Vote;
use App\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $votes = Vote::all();
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

    public function noduplicate($request){

    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      /*
      $client = new Client(); //GuzzleHttp\Client
      $address =request('address');
      $msg = request('vote');
      $signature = request('signature');
      $result = $client->request('GET','http://localhost:3333/api/msg?address='.$address.'&message='.$msg.'&signature='.$signature, []);
      */
      $this->validate($request, [
        'proposal_id'  => 'required',
        'option_id'  => 'required',
        'vote'  => 'required',
        'address' => 'required',
        'signature' => 'required',
      ]);

      $msg = urlencode(request('proposal_id').'/'.request('option_id').'/'.request('vote').'/'.request('address'));
      $address = urlencode(request('address'));
      $signature = urlencode(request('signature'));

        $client = new Client();
        $msg_url = 'http://localhost:3333/api/msg?address='.$address.'&message='.$msg.'&signature='.$signature;
        $mn_url = 'http://localhost:3333/api/mn?address='.$address;
        $msg_rdata = $client->request('GET', $msg_url);
        $mn_rdata = $client->request('GET', $mn_url);
        $msg_response = $msg_rdata->getBody()->getContents();
        $mn_response = $mn_rdata->getBody()->getContents();

        $userid = 0;
        if (Auth::check()){
          $userid = Auth::user()->id;
        }

        if($msg_response == "true" && $mn_response == "true") {
          $vote = Vote::updateOrCreate([
            'address' => request('address'),
            'proposal_id'  => request('proposal_id')],
            ['option_id'  => request('option_id'),
            'user_id' => $userid,
            'vote' =>  request('vote'),
            'signature' => request('signature'),
            'is_valid' => true

          ]);
          $optionforvote = Option::find(request('option_id'));
          $optionforvote->votes = Vote::where(['option_id' => request('option_id')])->count();
          $optionforvote->save();

          return response()->json([
            'vote' => $vote,
            'message' => 'Success!',
          ], 200);
        }
        else {
          return response()->json([
            'message' => 'csv: Invalid vote!',
          ], 200);
        }
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
      if ($vote->user_id == Auth::user()->id)
      {
        $this->validate($request, [
          'vote'  => 'required',
          'address' => 'required',
          'signature' => 'required',
          'is_valid' => 'required',
        ]);
        $vote->vote = request('vote');
        $vote->address = request('address');
        $vote->signature = request('signature');
        $vote->is_valid = request('is_valid');
        $vote->save();
        return response()->json([
          'message' => 'Vote cast successfully!'
        ], 200);
      }
      else {
        return response()->json([
          'message' => 'You did not cast this vote!'
        ], 200);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vote $vote)
    {

      $optionforvote = Option::find($vote->option_id);
      $optionforvote->votes--;
      $optionforvote->save();
      $vote->delete();
      return response()->json([
          'message' => 'Vote deleted successfully'
      ], 200);
    }

    public function __construct()
    {
      #$this->middleware('auth', ['except' => ['index', 'show']]);
    }
}
