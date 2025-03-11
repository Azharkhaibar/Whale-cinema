import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";
import {SkeletonMovieCard} from "../../components/SkeletonMovieCardLoading";

const PopularMoviesCarousel: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/popularmovies")
            .then((res) => {
                console.log("API Popular Movies:", res.data);
                setMovies(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching movies Popular:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 h-[100%]">
            <h2 className="text-white text-center text-4xl font-geologica font-bold mt-16">
                Popular streaming movies & series
            </h2>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonMovieCard key={index} />
                    ))}
                </div>
            ) : (
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    spaceBetween={20}
                    pagination={{ clickable: true, bulletClass: "swiper-pagination-bullet bg-gray-500" }}
                    modules={[Pagination]}
                    className="mySwiper h-auto"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id} className="">
                            <div className="text-white mt-16 p-4 rounded-md shadow-md h-auto cursor-pointer" onClick={() => navigate(`/movies/${movie.id}`)}>
                                <img src={movie.image?.medium || ""} alt={movie.name} className="w-full h-auto rounded-xl" />
                                <h2 className="text-2xl mt-6 font-bold">{movie.name}</h2>
                                <div className="flex items-center space-x-3 mt-2 text-gray-400 text-sm">
                                    <p className="text-md">{movie.premiered ? new Date(movie.premiered).getFullYear() : "N/A"}</p>
                                    <p className="text-md">{movie.genres ? movie.genres.join(", ") : "N/A"}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default PopularMoviesCarousel;
