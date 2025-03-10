<?php

use App\Http\Controllers\ApiMovieController;
use App\Http\Controllers\ListMoviesController;
use App\Http\Controllers\PageMoviesController;
use Illuminate\Support\Facades\Route;

Route::get('/popularmovies', [ApiMovieController::class, 'getPopularMovies']);
Route::get('/allmovies', [ApiMovieController::class, 'getAllMovies']);
Route::get('/seriesmovies', [ApiMovieController::class, 'getPopularSeriesMovies']);
Route::get('/top5shows', [ApiMovieController::class, 'getTop5ShowsMovies']);
Route::get('/listallmovies', [ListMoviesController::class, 'getAllMoviesList']);
Route::get('/featuredmovieslist', [ListMoviesController::class, 'getFeaturedMoviesList']);

Route::get('/getallmoviespage', [PageMoviesController::class, 'getAllMoviesInformation']);
Route::get('/getpopularmoviespage', [PageMoviesController::class, 'getPopularMovieOnWhale']);
Route::get('/gettoppickmovies', [PageMoviesController::class, 'getTopPicksMovies']);
