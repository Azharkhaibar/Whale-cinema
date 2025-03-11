<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class WebChannelMoviesController extends Controller
{
    public function getMoviesNetwork()
    {
        try {
            Log::info('Fetching web channel data');
            $responseGetChannelMovies = Http::get('https://api.tvmaze.com/schedule/full');
            if (!$responseGetChannelMovies->successful()) {
                Log::error('Failed to fetch data channel: ' . $responseGetChannelMovies->status());
                return response()->json([
                    "error" => "Failed to fetch data",
                    "status_code" => $responseGetChannelMovies->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $webChannelMovies = collect($responseGetChannelMovies->json())
                ->take(20)
                ->map(function ($movie) {
                    return [
                        "id" => $movie["id"] ?? null,
                        "name" => $movie["name"] ?? "Unknown",
                        "season" => $movie["season"] ?? null,
                        "number" => $movie["number"] ?? null,
                        "airdate" => $movie["airdate"] ?? null,
                        "webChannel" => $movie["_embedded"]["show"]["webChannel"] ?? null, // Ambil webChannel dari _embedded.show
                        "image" => $movie["_embedded"]["show"]["image"] ?? null, // Ambil gambar dari show
                        "url" => $movie["url"] ?? null,
                    ];
                });

            return response()->json([
                "status" => "success",
                "data" => $webChannelMovies
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json([
                "error" => "Error fetching web channel data",
                "status_code" => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
