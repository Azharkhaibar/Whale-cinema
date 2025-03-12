<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class pageAllMoviesController extends Controller
{
    public function showsAllMoviesData()
    {
        try {
            Log::info('Fetching Shows All Movies Data...');

            $responseMoviesShows = Http::get('https://api.tvmaze.com/shows');

            if (!$responseMoviesShows->successful()) {
                Log::error('Gagal fetching data: ' . $responseMoviesShows->status());
                return response()->json([
                    "error" => "Gagal mengambil data film",
                    "status_code" => $responseMoviesShows->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $showsMoviesData = collect($responseMoviesShows->json())->shuffle()->take(1000)->map(function ($showsMovies) {
                return [
                    "id" => $showsMovies['id'] ?? null,
                    "name" => $showsMovies['name'] ?? "Unknown",
                    "language" => $showsMovies['language'] ?? "Unknown",
                    "genres" => $showsMovies['genres'] ?? [],
                    "rating" => $showsMovies['rating']['average'] ?? "N/A",
                    "image" => [
                        "medium" => $showsMovies['image']['medium'] ?? null,
                        "original" => $showsMovies['image']['original'] ?? null,
                    ],
                    "imdb" => $showsMovies['externals']['imdb'] ?? null,
                    "summary" => strip_tags($showsMovies['summary'] ?? "No summary available."),
                    "officialSite" => $showsMovies['officialSite'] ?? null,
                    "premiered" => $showsMovies['premiered'] ?? null,
                ];
            });

            Log::info('Data yang dikirim ke frontend:', $showsMoviesData->toArray());

            return response()->json([
                "show_movies" => $showsMoviesData
            ], Response::HTTP_OK);
        } catch (\Exception $error) {
            Log::error('Error fetching data: ' . $error->getMessage());

            return response()->json([
                "error" => "Internal server error",
                "message" => $error->getMessage(),
                "status_code" => Response::HTTP_INTERNAL_SERVER_ERROR,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
