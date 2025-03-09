<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class ApiMovieController extends Controller
{
    public function getAllMovies(): JsonResponse
    {
        try {
            $response = Http::get("https://api.tvmaze.com/shows");
            Log::info("API Response getAllMovies: " . json_encode($response->json()));

            if ($response->successful()) {
                // Batasi hanya 20 hasil
                $movies = array_slice($response->json(), 0, 10);
                return response()->json($movies, Response::HTTP_OK);
            } else {
                return response()->json(["error" => "Failed to fetch movies"], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            Log::error("Error in getAllMovies: " . $e->getMessage());
            return response()->json(["error" => "Server Error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getPopularMovies(): JsonResponse
    {
        try {
            $response = Http::get("https://api.tvmaze.com/shows");
            Log::info("API Response getPopularMovies: " . json_encode($response->json()));

            if ($response->successful()) {
                $movies = collect($response->json())
                    ->filter(fn($movie) => isset($movie['rating']['average'])) // Pastikan rating ada
                    ->sortByDesc(fn($movie) => $movie['rating']['average'] ?? 0) // Urutkan berdasarkan rating
                    ->take(10);

                return response()->json($movies->values()->all(), Response::HTTP_OK);
            } else {
                return response()->json(["error" => "Failed to fetch movies"], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            Log::error("Error in getPopularMovies: " . $e->getMessage());
            return response()->json(["error" => "Server Error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getPopularSeriesMovies(): JsonResponse
    {
        try {
            $response = Http::get("https://api.tvmaze.com/shows");

            if ($response->failed()) {
                Log::error("API request failed: " . $response->status());
                return response()->json(["error" => "Failed to fetch series"], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            Log::info("API Response getPopularSeriesMovies: " . json_encode($response->json()));

            $series = collect($response->json())
                ->filter(fn($show) => isset($show['rating']['average']) && isset($show['type']) && $show['type'] === 'Scripted')
                ->sortByDesc(fn($show) => $show['rating']['average'] ?? 0)
                ->take(6);

            return response()->json($series->values()->all(), Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error("Error in getPopularSeriesMovies: " . $e->getMessage());
            return response()->json(["error" => "Server Error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function getTop5ShowsMovies()
    {
        try {

            $response = Http::get('https://api.tvmaze.com/shows');
            if ($response->successful()) {
                $top5Shows = collect($response->json())->take(5);
                return response()->json($top5Shows, 200);
            } else {
                return response()->json(['error' => 'Failed to fetch data'], 500);
            }
        } catch (\Exception $e) {
            Log::error('Error in getTop5ShowsMovies: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
