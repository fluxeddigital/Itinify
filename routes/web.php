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
    return redirect()->route('login');
});

Auth::routes(['verify' => true]);

Route::view('/companies/create', 'companies.create')->name('companies.create')->middleware(['auth', 'verified', 'company.none']);

Route::view('/app/{path?}', 'app')->where('path', '(.*)')->name('app')->middleware(['auth', 'verified', 'company']);

Route::get('/invoices/{id}', 'AppController@invoice')->name('app.invoice');

Route::get('/portal/clients', 'PortalController@clientsIndex')->name('portal.clients.index');
Route::post('/portal/clients/{email}/id', 'PortalController@clientSendIdReminder')->name('portal.clients.id');
Route::get('/portal/clients/{id}/{email}', 'PortalController@clientShow')->name('portal.clients.show');
Route::get('/portal/clients/{clientId}/{clientEmail}/packages/{id}', 'PortalController@packageShow')->name('portal.packages.show');
Route::patch('/portal/clients/{clientId}/{clientEmail}/packages/{id}', 'PortalController@packageUpdate')->name('portal.packages.update');