<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class NetworkMoviesController extends Controller
{
    public function getMoviesNetwork()
    {
        try {
            Log::info('Fetching network channel');
            $response = Http::get('https://api.tvmaze.com/shows');

            if (!$response->successful()) {
                Log::error('gagal fetch data network channel: ' . $response->status());
                return response()->json([
                    "error" => "data tidak ditemukan cuy",
                    "status_code" => $response->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $shows = collect($response->json());
            $shownNetworks = [];
            $networkData = $shows->map(function ($show) use (&$shownNetworks) {
                $networkId = $show["network"]["id"] ?? null;
                $network = null;
                if ($networkId && !isset($shownNetworks[$networkId])) {
                    $network = [
                        "id" => $networkId,
                        "name" => $show["network"]["name"] ?? null,
                        "country" => $show["network"]["country"]["name"] ?? null,
                        "timezone" => $show["network"]["country"]["timezone"] ?? null,
                        "officialSite" => $show["network"]["officialSite"] ?? null,
                    ];
                    $shownNetworks[$networkId] = true;
                }
                return array_filter([
                    "id" => $show["id"] ?? null,
                    "showName" => $show["name"] ?? null,
                    "language" => $show["language"] ?? null,
                    "genres" => !empty($show["genres"]) ? $show["genres"] : null,
                    "status" => $show["status"] ?? null,
                    "runtime" => $show["runtime"] ?? null,
                    "rating" => $show["rating"]["average"] ?? null,
                    "premiered" => $show["premiered"] ?? null,
                    "schedule" => !empty($show["schedule"]["days"]) && !empty($show["schedule"]["time"])
                        ? ($show["schedule"]["days"][0] . " at " . $show["schedule"]["time"])
                        : null,
                    "image" => $show["image"]["medium"] ?? null,
                    "summary" => strip_tags($show["summary"] ?? ""),
                    "network" => $network
                ], fn($value) => !is_null($value)); // Hapus elemen yang bernilai null
            });

            return response()->json([
                "status" => "success",
                "data" => $networkData->values()
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json([
                "error" => "Error fetching network data",
                "status_code" => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
