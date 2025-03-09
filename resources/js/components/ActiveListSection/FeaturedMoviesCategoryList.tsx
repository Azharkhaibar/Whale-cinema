import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function FeaturedMovies() {
    const [getFeaturedMoviesData, setGetFeaturedMoviesData] = useState<any[]>([]);
    const [loadingMovies, setLoadingMovies] = useState(true);

    useEffect(() => {
        console.log("Fetching featured movies...");
        axios
            .get("http://127.0.0.1:8000/api/featuredmovieslist")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setGetFeaturedMoviesData(res.data);
                } else {
                    console.error("Unexpected response format:", res.data);
                    setGetFeaturedMoviesData([]);
                }
                setLoadingMovies(false);
            })
            .catch((err) => {
                console.error("API Error:", err.response?.data || err.message);
                setLoadingMovies(false);
            });
    }, []);

    return (
        <div className="container mx-auto mt-10">
            {loadingMovies ? (
                // ✅ Skeleton Loader Saat Loading ✅
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-800 h-72 rounded-lg"></div>
                            <div className="bg-gray-700 h-5 w-3/4 mx-auto mt-4 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : getFeaturedMoviesData.length > 0 ? (
                <Swiper
                    slidesPerView={6}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper relative"
                >
                    {getFeaturedMoviesData.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="rounded-lg h-96 shadow-lg">
                                <img
                                    src={movie.image?.medium || "/placeholder.jpg"}
                                    alt={movie.name || "No Title Available"}
                                    className="w-full h-72 rounded-lg object-cover"
                                />
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-400 text-md font-semibold">
                                        ⭐ {movie.rating?.average ?? "No Rating"}
                                    </span>
                                </div>
                                <h2 className="text-xl text-white mt-2 font-bold">
                                    {movie.name || "Untitled"}
                                </h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                // ✅ Jika Tidak Ada Data ✅
                <p className="text-center text-gray-500">No featured movies found.</p>
            )}
        </div>
    );
}
