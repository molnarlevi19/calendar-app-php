<?php

namespace App\Http\Controllers;

use App\Http\Request\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

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
}
