import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaArrowLeft } from "react-icons/fa";

const MovieDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios
            .get(`/api/getmoviedetail/${id}`)
            .then((res) => {
                if (res.data?.data) {
                    setMovie(res.data.data);
                } else {
                    setError("Movie not found.");
                }
            })
            .catch(() => {
                setError("Failed to fetch movie details.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <motion.div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                ></motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-red-500 text-lg font-semibold">{error}</p>
                <button
                    onClick={() => navigate("/movies")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Back to Movies
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen text-white">
            {/* Background Blur */}
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${movie?.image?.original || '/default-movie.jpg'})` }} />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-20 md:px-16 lg:px-20 max-w-4xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/movies")}
                    className="flex pt-10 items-center gap-2 mb-28 text-white hover:text-gray-300 transition"
                >
                    <FaArrowLeft /> Back to Movies
                </button>

                {/* Movie Title */}
                <h1 className="text-6xl md:text-5xl font-bold mb-4">{movie.name}</h1>

                {/* Movie Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-md opacity-80 mb-10">
                    <span className="text-lg rounded-full">{movie.status}</span>
                    <span className="text-lg rounded-full">{movie.runtime} min</span>
                    <span className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" /> {movie.rating?.average || "N/A"}
                    </span>
                </div>

                {/* Genres */}
                <div className="mt-4 flex flex-wrap gap-4">
                    {movie.genres.map((genre: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/50 border-gray-500/20 rounded-full text-sm">
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Summary */}
                <div className="mt-6 text-lg leading-relaxed opacity-90 mb-10">
                    <span dangerouslySetInnerHTML={{ __html: movie.summary }} />
                </div>

                <div className="flex text-white font-bold text-xl items-center space-x-4">
                    <button className="bg-blue-500 py-2 px-8 rounded-full">Play Now</button>
                    <button className="bg-gray-400/30 py-2 px-8 rounded-full">Watch Trailer</button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
