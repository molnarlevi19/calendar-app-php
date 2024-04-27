<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update($id, Request $request)
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

    public function index($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }
}
