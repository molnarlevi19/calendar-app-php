<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TemperatureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('allCalendars', [CalendarController::class, 'allCalendars']);
    Route::post('storeCalendar', [CalendarController::class, 'store']);
    Route::post('storeEvent', [EventController::class, 'store']);
    Route::post('createImage', [ImageController::class, 'store']);
    Route::post('logout', [AuthController::class, 'logout']);
});
Route::patch('profile/{id}', [ProfileController::class, 'update']);
Route::get('profile/{id}', [ProfileController::class, 'index']);
Route::get('images/{id}', [ImageController::class, 'index']);


Route::get('temperature', [TemperatureController::class, 'getTemperature']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
