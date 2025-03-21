<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::group([
    'prefix' => 'v1/grocery-store'
], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});
