<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  public function index()
  {

        if (Auth::check())
        {
        return response()->json([
          'logged_in' => true,
          'user_id' => Auth::user()->id,
          'is_admin' => Auth::user()->is_admin,
      ], 200);
    }
        else {
          return response()->json([
          'logged_in' => false,
        ], 200);
        }

  }
}
