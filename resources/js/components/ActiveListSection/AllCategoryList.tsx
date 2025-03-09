import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function AllMovies() {
    const [getAllMoviesData, setGetAllMoviesData] = useState<any[]>([]);
    const [loadingMovies, setLoadingMovies] = useState(true);

    useEffect(() => {
        console.log("Fetching movies...");
        axios
            .get("/api/listallmovies")
            .then((res) => {
                console.log("API Response:", res.data);
                setGetAllMoviesData(res.data);
                setLoadingMovies(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setLoadingMovies(false);
            });
    }, []);

    return (
        <div className="container mx-auto h-96 mt-10">
            {loadingMovies ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-800 h-72 rounded-lg"></div>
                            <div className="bg-gray-700 h-5 w-3/4 mx-auto mt-4 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {getAllMoviesData.length > 0 ? (
                        <div>
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={20}
                                pagination={{ clickable: true }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper relative"
                            >
                                {getAllMoviesData.map((movie) => (
                                    <SwiperSlide key={movie.id}>
                                        <div className="shadow-lg rounded-lg h-96">
                                            <img
                                                src={movie.image?.medium || "/placeholder.jpg"}
                                                alt={movie.name || "Unknown"}
                                                className="w-full h-72 rounded-lg object-cover"
                                            />
                                            <h2 className="text-xl text-white mt-4 font-bold">
                                                {movie.name}
                                            </h2>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No movies found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
