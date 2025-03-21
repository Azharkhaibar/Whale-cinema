<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageMoviesController extends Controller
{
    public function getAllMoviesInformation(): JsonResponse
    {
        try {
            Log::info("Fetching data from API...");
            $response_movies_detail = Http::timeout(10)->get("https://api.tvmaze.com/shows");
            if (!$response_movies_detail->successful()) {
                Log::error("API request failed with status: " . $response_movies_detail->status());
                return response()->json([
                    "error" => "Failed to fetch data from TVMaze",
                    "status_code" => $response_movies_detail->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $moviesData = $response_movies_detail->json();
            if (!is_array($moviesData)) {
                Log::error("Invalid API response: " . json_encode($moviesData));
                return response()->json(["error" => "Invalid API response format"], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            $limitedMovies = array_slice($moviesData, 0, 5);
            return response()->json(["movies" => $limitedMovies], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error("Error fetching movies: " . $e->getMessage());
            return response()->json([
                "error" => "Internal Server Error",
                "message" => $e->getMessage(),
                "line" => $e->getLine(),
                "file" => $e->getFile()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getPopularMovieOnWhale(): JsonResponse
    {
        try {
            Log::info("Fetching popular movies from API...");
            $response = Http::timeout(10)->get('https://api.tvmaze.com/shows');

            if (!$response->successful()) {
                Log::error("API request failed with status: " . $response->status());
                return response()->json([
                    "error" => "Failed to fetch data from TVMaze",
                    "status_code" => $response->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $moviesData = $response->json();
            if (!is_array($moviesData)) {
                Log::error("Invalid API response format: " . json_encode($moviesData));
                return response()->json(["error" => "Invalid API response format"], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            usort($moviesData, function ($a, $b) {
                return ($b['rating']['average'] ?? 0) <=> ($a['rating']['average'] ?? 0);
            });

            $limitedMovies = array_slice($moviesData, 0, 20);
            return response()->json(["movies" => $limitedMovies], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error("Error fetching movies: " . $e->getMessage());
            return response()->json([
                "error" => "Internal Server Error",
                "message" => $e->getMessage(),
                "line" => $e->getLine(),
                "file" => $e->getFile()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTopPicksMovies(): JsonResponse
    {
        try {
            Log::info('Fetching Picks Movies from API ...');
            $responseGetMovies = Http::timeout(10)->get('https://api.tvmaze.com/shows');

            if (!$responseGetMovies->successful()) {
                Log::error('Failed to fetch API. Status: ' . $responseGetMovies->status());
                return response()->json([
                    "error" => "Failed to fetch movies",
                    "status_code" => $responseGetMovies->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $moviesGetObject = collect($responseGetMovies->json())
                ->shuffle()
                ->take(15)
                ->map(function ($moviesObject) {
                    return [
                        "id" => $moviesObject['id'] ?? null,
                        "name" => $moviesObject['name'] ?? "Unknown",
                        "language" => $moviesObject['language'] ?? "Unknown",
                        "genres" => $moviesObject['genres'] ?? [],
                        "rating" => $moviesObject['rating']['average'] ?? "N/A",
                        "image" => [
                            "medium" => $moviesObject['image']['medium'] ?? null,
                            "original" => $moviesObject['image']['original'] ?? null,
                        ],
                        "imdb" => $moviesObject['externals']['imdb'] ?? null,
                        "summary" => strip_tags($moviesObject['summary'] ?? "No summary available."),
                        "officialSite" => $moviesObject['officialSite'] ?? null,
                        "premiered" => $moviesObject['premiered'] ?? null,
                    ];
                });

            return response()->json(["top_picks" => $moviesGetObject], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json([
                "error" => "An error occurred while fetching movies",
                "status_code" => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
