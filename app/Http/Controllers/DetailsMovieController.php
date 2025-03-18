<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DetailsMovieController extends Controller
{

    // SHOW CAST INFO
    public function showDetailMovie($id)
    {
        Log::info("Fetching movie with ID: {$id}");

        // Ambil data movie beserta cast
        $response = Http::get("https://api.tvmaze.com/shows/{$id}?embed=cast");

        if ($response->failed()) {
            Log::error("Failed to fetch movie with ID: {$id}", ['response' => $response->body()]);
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $data = $response->json();

        if (empty($data)) {
            Log::warning("Empty response for movie ID: {$id}");
            return response()->json(['error' => 'Movie not found'], 404);
        }

        return response()->json([
            'data' => [
                'id' => $data['id'],
                'name' => $data['name'],
                'language' => $data['language'],
                'genres' => $data['genres'] ?? [],
                'status' => $data['status'] ?? 'Unknown',
                'runtime' => $data['runtime'] ?? 'Unknown',
                'premiered' => $data['premiered'] ?? 'Unknown',
                'ended' => $data['ended'] ?? 'Still Airing',
                'rating' => $data['rating']['average'] ?? 'N/A',
                'schedule' => ($data['schedule']['days'][0] ?? 'Unknown') . ' at ' . ($data['schedule']['time'] ?? 'Unknown'),
                'network' => $data['network']['name'] ?? 'Unknown',
                'officialSite' => $data['officialSite'] ?? '#',
                'image' => [
                    'original' => $data['image']['original'] ?? asset('/default-movie.jpg'),
                ],
                'summary' => strip_tags($data['summary'] ?? 'No summary available.'),
                'cast' => collect($data['_embedded']['cast'] ?? [])->take(10)->map(fn($castMember) => [
                    'actor_name'=> $castMember['person']['name'],
                    'actor_profile'=> $castMember['person']['url'] ?? '#',
                    'actor_image'=> $castMember['person']['image']['original'] ?? asset('/default-profile.jpg'),
                    'character_name'=> $castMember['character']['name'] ?? 'Unknown',
                    'character_image'=> $castMember['character']['image']['original'] ?? asset('/default-character.jpg'),
                    'character_profile'=> $castMember['character']['url'] ?? '#',
                ]),
            ]
        ]);
    }

    public function RelatedMovies($id) {
        try {
            Log::info("Fetching Data berdasarkan genre : {$id}");
            $response_data = Http::get("https://api.tvmaze.com/shows/{$id}");
            if ($response_data->failed()) {
                Log::error("failed untuk fetch data genre: {$id}", ['response' => $response_data->body()]);
                return response()->json(['error' => 'Movie kgk ketemu'], 404);
            }
            $get_movie = $response_data->json();
            $based_on_genres = $get_movie['genres'] ?? [];
            if (empty($based_on_genres)) {
                return response()->json(['error' => 'Movie kgk ketemu'], 404);
            }
            $relatedResponse = Http::get('https://api.tvmaze.com/shows');
            if ($relatedResponse->failed()) {
                return response()->json(['error' => 'failed untuk dapet data'], 500);
            }
            $getAllMovies = $relatedResponse->json();
            $relatedMoviesFilter = collect($getAllMovies)->filter(function ($movieItem) use ($based_on_genres, $id) {
                return !empty(array_intersect($based_on_genres, $movieItem['genres'] ?? [])) && (int) $movieItem['id'] !== (int)$id;
            })->take(20)->map(function ($movieItem) {
                return [
                    'id' => $movieItem['id'],
                    'name' => $movieItem['name'],
                    'language' => $movieItem['language'],
                    'genres' => $movieItem['genres'],
                    'rating' => $movieItem['rating']['average'] ?? 'N/A',
                    'image' => $movieItem['image']['original'] ?? asset('/default-movie.jpg'),
                ];
            })->values();
            return response()->json(['related_movies' => $relatedMoviesFilter]);
        } catch(\Exception $e) {
            Log::error("Error fetching related movies: " . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan server'], 500);
        }
    }
}
