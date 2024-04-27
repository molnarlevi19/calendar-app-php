<?php

namespace App\Services;

use App\Models\ProfileImage;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ImageService
{
    public function store(Request $request): JsonResponse
    {
        try {
            $uuid = Str::uuid();

            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $path = $request->file('image')->storeAs(
                'images', $request->user()->id
            );

            $imagename = basename($path);

            $existingImage = ProfileImage::where('imagename', $request->user()->id)->first();

            if (isset($existingImage)) {
                try {
                    $existingImage->delete();
                    echo 'inside';
                } catch (Exception $e) {
                    Log::error('Error deleting existing image: ' . $e->getMessage());

                }
            }

            $profileImage = ProfileImage::create([
                'uuid' => $uuid,
                'imagename' => $imagename,
            ]);


            return response()->json($profileImage, Response::HTTP_CREATED);

        } catch (QueryException $e) {

            if ($e->getCode() === '23000') {
                return \response()->json(['error' => 'UUID already exist'], Response::HTTP_CONFLICT);
            }

            return \response()->json(['error' => $e->getCode() . ' Database error'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function index($id)
    {
        $imagePath = storage_path('app/images/' . $id);

        if (file_exists($imagePath)) {
            $imageData = file_get_contents($imagePath);

            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $imagePath);
            finfo_close($finfo);

            return response($imageData, 200)
                ->header('Content-Type', $mimeType ?: 'image/jpeg');
        } else {

            return response('Image not found', 404);
        }
    }
}
