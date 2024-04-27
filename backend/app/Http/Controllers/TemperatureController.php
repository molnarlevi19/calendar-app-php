<?php

namespace App\Http\Controllers;

use App\Services\TemperatureService;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redis;

class TemperatureController extends Controller
{

    private TemperatureService $temperatureService;

    public function __construct(TemperatureService $temperatureService)
    {
        $this->temperatureService = $temperatureService;
    }


    /**
     * @throws GuzzleException
     */
    public function getTemperature(): JsonResponse
    {
        return $this->temperatureService->getTemperature();
    }
}
