<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redis;

class TemperatureService
{
    private static string $apiKey = 'eba53cd393c943e99b7122339231303';
    private static string $redisKey = 'temperature:budapest';

    /**
     * @throws GuzzleException
     */
    public function getTemperature(): JsonResponse
    {
        $temperature = Redis::get(self::$redisKey);

        if($temperature === null) {
            $temperature = $this->fetchTemperatureFromApi();

            Redis::setex(self::$redisKey, 600, $temperature);
        }

        return response()->json(['temperature' => $temperature]);
    }

    /**
     * @throws GuzzleException
     */
    private function fetchTemperatureFromApi(): float
    {
        $client = new Client();
        $response = $client->get('https://api.weatherapi.com/v1/current.json', [
            'query' => [
                'key' => self::$apiKey,
                'q' => 'Budapest',
                'aqi' => 'no',
            ]
        ]);
        $data = json_decode($response->getBody(), true);

        return $data['current']['temp_c'];
    }
}
