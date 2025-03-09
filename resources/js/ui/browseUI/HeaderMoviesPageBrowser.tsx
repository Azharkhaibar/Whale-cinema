import axios from "axios";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const MoviesHeaderBrowse = () => {
    const [movieHeaderInformation, setMovieHeaderInformation] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/getallmoviespage")
            .then((res) => {
                if (!res.data || typeof res.data !== "object" || !("movies" in res.data)) {
                    setErrorMessage("Invalid API response format");
                    return;
                }
                setMovieHeaderInformation(res.data.movies.slice(0, 8)); // Limit to 5 movies
            })
            .catch((err) => {
                setErrorMessage(err.response?.data?.error || "Failed to load movies.");
            })
            .finally(() => setLoadingData(false));
    }, []);

    if (loadingData) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-800 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-800 text-red-500">
                <p>Error: {errorMessage}</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen bg-gray-900 text-white flex items-center justify-center">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="w-full h-full"
            >
                {movieHeaderInformation.map((movie, index) => (
                    <SwiperSlide key={index} className="relative w-full h-screen">
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0"
                            style={{
                                backgroundImage: `url(${movie?.image?.original || '/default-movie.jpg'})`,
                            }}
                        />
                        <div className="absolute inset-0 bg-black/30"></div>

                        <div className="relative z-10 max-w-3xl p-6 mt-28 pl-20 space-y-4">
                            <h1 className="text-4xl font-bold font-geologica pt-20">{movie.name || "Movie Title"}</h1>
                            <p><b>Rating:</b> {movie.rating?.average || "N/A"} / 10</p>
                            <p className="mt-2 text-lg text-white font-light font-geologica" dangerouslySetInnerHTML={{ __html: movie.summary || "Description not available" }}></p>
                            <div className="mt-4 text-white text-lg space-y-2">
                                <p className="text-sm"><b></b> {movie.genres?.join(", ") || "N/A"}</p>
                                <p><b>Bahasa:</b> {movie.language || "N/A"}</p>
                            </div>

                            <button className="bg-blue-600 py-2 px-10 rounded-full text-white text-lg font-semibold mt-6 hover:bg-blue-700 transition">
                                Play Now
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MoviesHeaderBrowse;
