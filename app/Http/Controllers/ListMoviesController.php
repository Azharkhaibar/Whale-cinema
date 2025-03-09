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
            $response_movies_list = Http::get("https://api.tvmaze.com/shows");

            if ($response_movies_list->successful()) {
                $movies = $response_movies_list->json();
                $featuredMovies = array_filter($movies, function ($movie) {
                    return isset($movie['rating']['average']) && $movie['rating']['average'] >= 8.0;
                });

                // Urutkan berdasarkan rating (dari tertinggi ke terendah)
                usort($featuredMovies, function ($a, $b) {
                    return $b['rating']['average'] <=> $a['rating']['average'];
                });

                // Ambil 20 film terbaik
                $featuredMoviesLimit = array_slice($featuredMovies, 0, 20);
                return response()->json($featuredMoviesLimit, Response::HTTP_OK);
            } else {
                return response()->json(["error" => "Server Error"], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            Log::error("Error in getFeaturedMoviesList: " . $e->getMessage());
            return response()->json(["error" => "Server Error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
