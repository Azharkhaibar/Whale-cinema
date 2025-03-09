import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import MovieDetail from "../ui/MoviesUI/MovieDetailInfo";
import Navbar from "../ui/NavbarMovieWeb";
import MoviesPage from "../pages/moviesPage";

const App: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
            </Routes>
        </div>
    );
};

export default App;
