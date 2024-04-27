<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProfileController extends Controller
{
    private ProfileService $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }


    public function update($id, Request $request): JsonResponse
    {
        return $this->profileService->update($id, $request);
    }

    public function index($id): JsonResponse
    {
       return $this->profileService->index($id);
    }
}
