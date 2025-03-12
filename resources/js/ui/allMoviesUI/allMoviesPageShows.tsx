import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const AllMoviesShows = () => {
    const [showsMoviesData, setShowsMoviesData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [loadingShowsMovies, setLoadingShowsMovies] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState("Trending");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/showsmovies")
            .then((res) => {
                if (res.data.show_movies && res.data.show_movies.length > 0) {
                    setShowsMoviesData(res.data.show_movies);
                    setFilteredData(res.data.show_movies);
                } else {
                    setShowsMoviesData([]);
                    setFilteredData([]);
                }
            })
            .catch(() => {
                setError("Failed to load movies.");
            })
            .finally(() => {
                setLoadingShowsMovies(false);
            });
    }, []);

    useEffect(() => {
        let sortedData = [...showsMoviesData];

        if (selectedGenre !== "All") {
            sortedData = sortedData.filter((show) => show.genres.includes(selectedGenre));
        }

        switch (sortOption) {
            case "Trending":
                sortedData.sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
                break;
            case "Popularity":
                sortedData.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
                break;
            case "Alphabetical":
                sortedData.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
                break;
            case "Release Year":
                sortedData.sort((a, b) =>
                    (parseInt(b.premiered?.split("-")[0]) || 0) - (parseInt(a.premiered?.split("-")[0]) || 0)
                );
                break;
            case "Random":
                sortedData.sort(() => Math.random() - 0.5);
                break;
            default:
                break;
        }

        setFilteredData(sortedData);
    }, [sortOption, selectedGenre, showsMoviesData]);

    const genres = ["All", ...new Set(showsMoviesData.flatMap((show) => show.genres))];

    return (
        <div className="px-20 py-16">
            <h2 className="text-3xl font-bold text-white mb-5 pt-20 font-geologica">🎬 All Movies & TV Shows</h2>
            <div className="text-white text-lg mb-10 flex items-center gap-4">
                <p>{filteredData.length} titles</p>
                <p>Sorted by:</p>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center bg-gray-800 text-white px-4 rounded-md shadow-md hover:bg-gray-700 transition"
                    >
                        {sortOption} <ChevronDown className="ml-2 w-5 h-5" />
                    </button>
                    {isDropdownOpen && (
                        <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-50">
                            {["Trending", "Popularity", "Random", "Alphabetical", "Release Year"].map((option) => (
                                <li key={option}>
                                    <button onClick={() => {
                                            setSortOption(option);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                        className="flex bg-gray-800 text-white px-4 rounded-md shadow-md hover:bg-gray-700 transition"
                    >
                        {selectedGenre} <ChevronDown className="ml-2 w-5 h-5" />
                    </button>
                    {genreDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-96 bg-gray-800 text-white z-50 p-2">
                            <div className="grid grid-cols-3 gap-8">
                                {genres.map((genre) => (
                                    <button
                                        key={genre}
                                        onClick={() => {
                                            setSelectedGenre(genre);
                                            setGenreDropdownOpen(false);
                                        }}
                                        className=" py-2 rounded-md hover:bg-gray-600 transition"
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {loadingShowsMovies ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <motion.div key={index} className="bg-gray-800 p-4 rounded-xl shadow-md">
                            <Skeleton height={300} className="rounded-lg" />
                            <Skeleton width="80%" className="mt-3" />
                        </motion.div>
                    ))}
                </div>
            ) : error ? (
                <p className="text-red-400 text-center text-lg">{error}</p>
            ) : filteredData.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                    {filteredData.map((show) => (
                        <motion.div key={show.id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
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
