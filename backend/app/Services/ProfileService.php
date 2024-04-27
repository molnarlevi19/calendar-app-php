<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProfileService
{
    public function update($id, Request $request): JsonResponse
    {
        $user = User::findOrFail($id);

        $validateData = $request->validate([
            'surname' => 'nullable|string|max:255',
            'lastname' => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
            'UserGender' => 'nullable|string|in:MALE,FEMALE',
            'phone' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'imageid' => 'nullable|exists:profileimages,id',
        ]);

        $user->update($validateData);

        return response()->json(['message' => 'Profile updated successfully.']);
    }

    public function index($id): JsonResponse
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }
}
