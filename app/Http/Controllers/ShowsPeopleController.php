<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShowsPeopleController extends Controller
{
    public function getAllPeoples(): JsonResponse
    {
        try {
            Log::info('Fetching data from TVMaze API');

            $getResponsePeopleData = Http::timeout(10)->get('https://api.tvmaze.com/people');

            if (!$getResponsePeopleData->successful()) {
                Log::error('API request failed: ' . $getResponsePeopleData->status());
                return response()->json([
                    "error" => "Gagal fetch data",
                    "status_code" => $getResponsePeopleData->status()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            $peopleData = $getResponsePeopleData->json();
            if (!is_array($peopleData)) {
                Log::error('Invalid data format received');
                return response()->json([
                    "error" => "Format data tidak valid dari API",
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return response()->json([
                "success" => true,
                "PeopleShows" => $peopleData
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json([
                "error" => "Terjadi kesalahan pada server",
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
