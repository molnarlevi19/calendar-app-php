<?php

namespace App\Http\Controllers;

use App\Http\Request\RegisterRequest;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
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

            return \response()->json([$user], Response::HTTP_CREATED);

        } catch (QueryException $e) {

            if ($e->getCode() === '23000') {
                return  \response()->json(['error' => 'UUID already exist'], Response::HTTP_CONFLICT);
            }

            return \response()->json(['error' => 'Database error'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {

            return response()->json([
                'message' => 'Bad credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json(['token' => $token], Response::HTTP_OK);
    }

    public function logout(): array
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'logout',
        ];
    }
}
