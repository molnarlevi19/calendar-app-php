<?php

namespace App\Http\Controllers;

use App\Models\Calendar;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use Symfony\Component\HttpFoundation\Response;

class CalendarController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'calendar_name' => 'required|string|max:255',
            'calendar_description' => 'nullable|string|max:255',
            'user_id' => [
                'required',
                'integer',
                Rule::exists('users', 'id'),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $calendar = Calendar::create([
            'calendar_name' => $request->input('calendar_name'),
            'calendar_description' => $request->input('calendar_description'),
            'user_id' => $request->input('user_id'),
        ]);

        return \response()->json([$calendar], Response::HTTP_CREATED);
    }

    public function allCalendars(): array
    {
     $user = Auth::user();

     $calendars = $user->calendars;
     $calendarNames = [];

         foreach ($calendars as $calendar) {

             $calendarNames[$calendar->calendar_id] = $calendar->calendar_name;
         }

         return $calendarNames;
    }
}
