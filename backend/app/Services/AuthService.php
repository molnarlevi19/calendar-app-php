<?php

namespace App\Services;

use App\Http\Request\RegisterRequest;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthService
{
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $hashPassword = Hash::make($request->input("password"));
            $uuid = Str::uuid();

            $user = User::create([
                'uuid' => $uuid,
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'password' => $hashPassword,
            ]);

            return response()->json([$user], Response::HTTP_CREATED);

        } catch (QueryException $e) {

            if ($e->getCode() === '23000') {
                return  response()->json(['error' => 'UUID already exist'], Response::HTTP_CONFLICT);
            }

            return response()->json(['error' => 'Database error'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('myapptoken')->plainTextToken;
            return response()->json(['token' => $token, 'user_id' => $user->id], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Bad credentials'], Response::HTTP_UNAUTHORIZED);
    }

    public function logout(): array
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'logout',
        ];
    }
}
