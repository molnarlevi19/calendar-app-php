<?php

namespace App\Http\Controllers;

use App\Http\Request\RegisterRequest;
use App\Services\AuthService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }


    public function register(RegisterRequest $request): JsonResponse
    {
        return $this->authService->register($request);
    }

    public function login(Request $request): JsonResponse
    {
        return $this->authService->login($request);
    }

    public function logout(): void
    {
        $this->authService->logout();
    }
}
