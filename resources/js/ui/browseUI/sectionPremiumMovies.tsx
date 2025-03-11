import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";

export default function GetPremiumMovies() {
    const [topPicksMovies, setTopPicksMovies] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/gettoppickmovies')
            .then((res) => {
                console.log('Fetched movies:', res.data);
                setTopPicksMovies(res.data.top_picks || []);
            })
            .catch((err) => {
                console.error('Error fetching movies:', err);
                setError(true);
                setTopPicksMovies([]); 
            })
            .finally(() => {
                setLoadingData(false);
            });
    }, []);

    return (
        <div className="w-full h-auto px-16">
            <h2 className="text-white text-2xl font-geologica font-bold mt-16">
                IMDB Top Picks
            </h2>

            {loadingData && <p className="text-gray-300">Loading movies...</p>}
            {error && <p className="text-red-500">Failed to fetch movies. Please try again.</p>}

            {!loadingData && !error && (
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={6}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 },
                    }}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    className="mySwiper h-auto mt-10"
                >
                    {topPicksMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="text-white rounded-md shadow-md h-auto cursor-pointer" onClick={() => navigate(`/movies/${movie.id}`)}>
                                <img
                                    src={movie.image?.medium ?? "/default-movie.jpg"}
                                    alt={movie.name}
                                    className="w-full h-auto rounded-xl"
                                />
                                <h2 className="text-2xl mt-6 font-bold font-geologica">{movie.name}</h2>
                                <div className="flex items-center space-x-3 mt-2 text-gray-400 text-sm">
                                    <p className="text-md">
                                        {movie.premiered ? new Date(movie.premiered).getFullYear() : "N/A"}
                                    </p>
                                    <p className="text-sm text-blue-600 font-medium">{movie.genres?.join(", ") || "N/A"}</p>
                                    <p className="text-yellow-500">{movie.rating !== "N/A" ? `⭐ ${movie.rating}` : "No Rating"}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
