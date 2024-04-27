<?php

namespace App\Http\Controllers;

use App\Models\Calendar;


use App\Services\CalendarService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;

class CalendarController extends Controller
{
    private CalendarService $calendarService;

    public function __construct(CalendarService $calendarService)
    {
        $this->calendarService = $calendarService;
    }


    public function store(Request $request): JsonResponse
    {
        return $this->calendarService->store($request);
    }

    public function allCalendars(): array
    {
     return $this->calendarService->allCalendars();
    }
}
