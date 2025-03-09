<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class ListMoviesController extends Controller
{
    public function getAllMoviesList(): JsonResponse {
        try {
            $response_movies_list = Http::get("https://api.tvmaze.com/shows");
            Log::info("succesfully fetch all movies: " . json_encode($response_movies_list->json()));
            if ($response_movies_list->successful()){
                $moviesListLimit = array_slice($response_movies_list->json(), 0, 20);
                return response()->json($moviesListLimit, Response::HTTP_OK);
            } else {
                return response()->json(["Error"=>"Server Error"], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            Log::error("Error in getAllMovies: " . $e->getMessage());
            return response()->json(["error" => "Server Error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getFeaturedMoviesList(): JsonResponse
    {
        try {
            $response_featured_movies = Http::timeout(10)->get("https://api.tvmaze.com/shows");
            $responseData = [
                "status" => Response::HTTP_OK,
                "data" => []
            ];

            if (!$response_featured_movies->successful()) {
                Log::error("TVMaze API error: " . $response_featured_movies->status());
                $responseData = [
                    "status" => Response::HTTP_BAD_GATEWAY,
                    "data" => ["error" => "Failed to fetch data from TVMaze"]
                ];
            } else {
                $Movies_featured = $response_featured_movies->json();
                if (!is_array($Movies_featured)) {
                    Log::error("Invalid response format from TVMaze.");
                    $responseData = [
                        "status" => Response::HTTP_INTERNAL_SERVER_ERROR,
                        "data" => ["error" => "Invalid response format"]
                    ];
                } else {
                    $featuredMovies = array_filter(
                        $Movies_featured,
                        fn($Movies_featured) =>
                        isset($Movies_featured['rating']['average']) && is_numeric($Movies_featured['rating']['average']) && $Movies_featured['rating']['average'] >= 8.0
                    );

                    if (empty($featuredMovies)) {
                        Log::warning("No featured movies found.");
                        $responseData["data"] = ["message" => "No featured movies found."];
                    } else {
                        usort($featuredMovies, fn($a, $b) => $b['rating']['average'] <=> $a['rating']['average']);
                        $responseData["data"] = array_slice($featuredMovies, 0, 20);
                    }
                }
            }
        } catch (\Throwable $e) {
            Log::error("Error in getFeaturedMoviesList: " . $e->getMessage());
            $responseData = [
                "status" => Response::HTTP_INTERNAL_SERVER_ERROR,
                "data" => ["error" => "Server Error", "details" => $e->getMessage()]
            ];
        }

        return response()->json($responseData["data"], $responseData["status"]);
    }
}
