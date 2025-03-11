import { useMovies } from "../../components/moviesContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { SkeletonPopularMoviesWhale } from "../../components/SkeletonMovieCardLoading";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
export default function SectionMoviesByCategory() {
    const { WhalePopularMovies, loading, error } = useMovies();
    const navigate = useNavigate();
    return (
        <div className="w-full h-auto px-16">
            <h2 className="text-white text-2xl font-geologica font-bold mt-16">
                Popular Movies On Whale
            </h2>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonPopularMoviesWhale key={index} />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center text-red-500 mt-10 text-lg">
                    Failed to fetch movies. Please try again later.
                </div>
            ) : (
                <Swiper
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

                    {WhalePopularMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="text-white cursor-pointer rounded-md shadow-md h-auto" onClick={() => navigate(`/movies/${movie.id}`)}>
                                <img
                                    src={movie.image?.medium || "/default-movie.jpg"}
                                    alt={movie.name}
                                    className="w-full h-auto rounded-xl"
                                />
                                <h2 className="text-2xl mt-6 font-bold font-geologica">{movie.name}</h2>
                                <div className="flex items-center space-x-3 mt-2 text-gray-400 text-sm">
                                    <p className="text-md">
                                        {movie.premiered ? new Date(movie.premiered).getFullYear() : "N/A"}
                                    </p>
                                    <p className="text-sm text-blue-600 font-medium">{movie.genres?.join(", ") || "N/A"}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
