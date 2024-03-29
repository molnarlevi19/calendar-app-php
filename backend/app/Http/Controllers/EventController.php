<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'event_title' => 'required|string|max:255',
            'event_description' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'calendar_id' => [
                'required',
                'integer',
                Rule::exists('calendars', 'calendar_id'),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $event = Event::create([
            'event_title' => $request->input('event_title'),
            'event_description' => $request->input('event_description'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'calendar_id' => $request->input('calendar_id'),
        ]);

        return \response()->json([$event], Response::HTTP_CREATED);
    }
}
