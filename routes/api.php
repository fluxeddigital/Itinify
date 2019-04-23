<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/search', 'AppController@search')->name('app.search');
Route::get('/stats', 'AppController@stats')->name('app.stats');

Route::post('/clients/notify', 'ClientController@notify')->name('clients.notify');

Route::patch('/users/attach', 'UserController@attach')->name('users.attach');

Route::resources([
    'clients' => 'ClientController',
    'companies' => 'CompanyController',
    'events' => 'EventController',
    'items/categories' => 'ItemCategoryController',
    'items' => 'ItemController',
    'notes' => 'NoteController',
    'packages' => 'PackageController',
    'users' => 'UserController',
]);