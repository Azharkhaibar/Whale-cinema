import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import MovieDetail from "./MovieDetail";
import Navbar from "../ui/navbar";

const App: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
            </Routes>
        </div>
    );
};

export default App;
