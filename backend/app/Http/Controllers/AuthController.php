<?php

namespace App\Http\Controllers;

use App\Http\Request\RegisterRequest;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {

        $hashPassword = Hash::make($request->input("password"));
        $uuid = Str::orderedUuid();

        $user = User::create([
            'uuid' => $uuid,
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => $hashPassword,
        ]);


        return \response($user,Response::HTTP_CREATED);
    }

    public function login(Request $request): Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $fields = $request->validate([
           'email' => 'required|string',
           'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'Bad credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'token' => $token
        ];

        return response($response, Response::HTTP_OK);
    }

    public function logout(): array
    {
        auth()->user()->tokens()->delete();

        return[
            'message' => 'logout',
        ];
    }
}
