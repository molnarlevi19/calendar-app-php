<?php

namespace App\Services;

use App\Models\Calendar;
use App\Models\Event;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class EventService
{
    public function store(Request $request): JsonResponse
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

    public function index($id): JsonResponse
    {
        try {
            $events = Event::where('calendar_id', $id)->get();
            return response()->json($events);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to retrieve events'. $e], 500);
        }
    }
}
