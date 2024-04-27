<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class EventController extends Controller
{
    private EventService $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }


    public function store(Request $request): JsonResponse
    {
        return $this->eventService->store($request);
    }
}
