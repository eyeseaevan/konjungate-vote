<?php

namespace App\Http\Controllers;

use App\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $proposals = Proposal::all();
      if (Auth::check())
      {
        return response()->json([
          'proposals' => $proposals,
          'user_id' => Auth::user()->id,
        ], 200);
      }
      else {
        return response()->json([
          'proposals' => $proposals,
        ], 200);
      }
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
        'proposal'  => 'required',
        'expiry' => 'required',
      ]);
      $proposal = Proposal::create([
        'user_id' => Auth::user()->id,
        'proposal' =>  request('proposal'),
        'expiry' => request('expiry'),
      ]);
      return response()->json([
        'proposal' => $proposal,
        'message' => 'Success!'
      ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function show(Proposal $proposal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function edit(Proposal $proposal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proposal $proposal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
     public function destroy(Proposal $proposal)
     {
       $proposal->delete();
       return response()->json([
           'message' => 'Proposal deleted successfully'
       ], 200);
     }

     public function __construct()
     {
       $this->middleware('auth', ['except' => ['index', 'show']]);
     }
 }
