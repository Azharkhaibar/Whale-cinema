import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import MovieDetail from "../ui/MoviesUI/MovieDetailInfo";
import Navbar from "../ui/NavbarMovieWeb";
import MoviesPage from "../pages/moviesPage";
import { MovieProvider } from "./moviesContext";
import WebChannel from "../pages/webChannelPage";
const App: React.FC = () => {
    return (
        <div>
            <MovieProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:id" element={<MovieDetail />} />
                    <Route path="/webchannel" element={<WebChannel />} />
                    <Route path="/webnetwork" element={<WebChannel />} />
                </Routes>
            </MovieProvider>
        </div>
    );
};

export default App;
