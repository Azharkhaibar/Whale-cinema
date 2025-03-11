<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class DetailMoviesDataController extends Controller
{
    public function getDataDetailMovies($id)
    {
        if (!is_numeric($id)) {
            return response()->json([
                "status" => "error",
                "message" => "Invalid movie ID"
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $response = Http::timeout(10)->get("https://api.tvmaze.com/shows/{$id}");
            if ($response->successful()) {
                $movieData = $response->json();
                if (empty($movieData)) {
                    return response()->json([
                        "status" => "error",
                        "message" => "Movie not found"
                    ], Response::HTTP_NOT_FOUND);
                }

                return response()->json([
                    "status" => "success",
                    "data" => $movieData
                ], Response::HTTP_OK);
            } else {
                Log::error('Failed to fetch movie details: ' . $response->status());

                return response()->json([
                    "status" => "error",
                    "message" => "Failed to fetch movie details",
                    "status_code" => $response->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());

            return response()->json([
                "status" => "error",
                "message" => "Error fetching movie details",
                "status_code" => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
