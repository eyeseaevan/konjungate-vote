<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('vote');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/register/auth', 'RegisterController@showRegistrationForm');
Route::resource('/auth', 'AuthController');
Route::resource('/vote', 'VoteController');
Route::resource('/proposal', 'ProposalController');
Route::resource('/option', 'OptionController');
