import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const AllMoviesShows = () => {
    const [showsMoviesData, setShowsMoviesData] = useState<any[]>([]);
    const [loadingShowsMovies, setLoadingShowsMovies] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/showsmovies")
            .then((res) => {
                console.log("✅ Data dari API:", res.data);
                if (res.data.show_movies && res.data.show_movies.length > 0) {
                    setShowsMoviesData(res.data.show_movies);
                } else {
                    console.warn("⚠️ Tidak ada film tersedia");
                    setShowsMoviesData([]);
                }
            })
            .catch((error) => {
                console.error("❌ Error fetching data:", error);
                setError("Failed to load movies.");
                setShowsMoviesData([]);
            })
            .finally(() => {
                setLoadingShowsMovies(false);
            });
    }, []);

    return (
        <div className="px-20 py-16">
            <h2 className="text-3xl font-bold text-white mb-8 pt-20">🎬 All Movies & TV Shows</h2>

            {loadingShowsMovies ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 p-4 rounded-xl shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Skeleton height={300} className="rounded-lg" />
                            <Skeleton width="80%" className="mt-3" />
                        </motion.div>
                    ))}
                </div>
            ) : error ? (
                <p className="text-red-400 text-center text-lg">{error}</p>
            ) : showsMoviesData.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                    {showsMoviesData.map((show) => (
                        <motion.div
                            key={show.id}
                            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <img
                                src={show.image?.medium || "/placeholder.jpg"}
                                alt={show.name}
                                className="cursor-pointer w-full h-80 object-cover rounded-lg"
                                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                                onClick={() => navigate(`/movies/${show.id}`)}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-white text-center text-lg">No movies available.</p>
            )}
        </div>
    );
};

export default AllMoviesShows;
