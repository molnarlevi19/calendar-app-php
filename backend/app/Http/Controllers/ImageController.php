<?php

namespace App\Http\Controllers;

use App\Models\ProfileImage;
use App\Services\ImageService;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{
    private ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }


    public function store(Request $request): JsonResponse
    {
        return $this->imageService->store($request);
    }

    public function index($id)
    {
        return $this->imageService->index($id);
    }

}
