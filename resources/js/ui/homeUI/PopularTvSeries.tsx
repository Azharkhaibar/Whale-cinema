import axios from "axios";
import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { SkeletonTopShowCard, SkeletonCardPopularTV } from "../../components/SkeletonMovieCardLoading";
import { useNavigate } from "react-router-dom";
const PopularSeries: React.FC = () => {
    const [top5Shows, setTop5Shows] = useState<any[]>([]);
    const [popularSeriesMovies, setPopularSeriesMovies] = useState<any[]>([]);
    const [loadingSeries, setLoadingSeries] = useState(true);
    const [loadingTopShows, setLoadingTopShows] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/api/seriesmovies')
            .then((res) => {
                console.log('Data Series Movies:', res.data);
                setPopularSeriesMovies(res.data);
            })
            .catch((err) => console.error('Error fetching series movies:', err))
            .finally(() => setLoadingSeries(false));
    }, []);

    useEffect(() => {
        axios.get('/api/top5shows')
            .then((res) => {
                console.log('Top 5 Shows This Week:', res.data);
                setTop5Shows(res.data);
            })
            .catch((err) => console.error('Error fetching top 5 shows:', err))
            .finally(() => setLoadingTopShows(false));
    }, []);

    return (
        <div className="w-full px-8 flex flex-col md:flex-row justify-center mt-20">
            <div className="w-full md:w-10/12">
                <h2 className="text-3xl text-white mb-4 font-geologica">Popular TV Series Right Now</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {loadingSeries
                        ? Array.from({ length: 6 }).map((_, index) => <SkeletonCardPopularTV key={index} />)
                        : popularSeriesMovies.map((seriesMovie) => (
                            <div key={seriesMovie.id} className="text-white p-4 rounded-md shadow-md cursor-pointer"
                                onClick={() => navigate(`/movies/${seriesMovie.id}`)}
                            >
                                <img
                                    src={seriesMovie.image?.medium || "/placeholder.jpg"}
                                    alt={seriesMovie.name}
                                    className="w-full h-48 rounded-xl object-cover"
                                />
                                <h2 className="text-2xl mt-4 font-bold">{seriesMovie.name}</h2>
                                <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
                                    <h3>{seriesMovie.network?.name || "N/A"}</h3>
                                    <h3>{seriesMovie.runtime ? `${seriesMovie.runtime} min` : "N/A"}</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="w-full md:w-4/12 p-4">
                <h2 className="text-2xl font-bold mb-4 text-white">This Week's Top 5 Shows</h2>
                <div className="space-y-3">
                    {loadingTopShows
                        ? Array.from({ length: 5 }).map((_, index) => <SkeletonTopShowCard key={index} />)
                        : top5Shows.map((topShow, index) => (
                            <div key={topShow.id} className="cursor-pointer bg-transparent p-4 rounded-lg shadow-md flex items-center"
                                 onClick={() => navigate(`/movies/${topShow.id}`)}
                            >
                                <img
                                    src={topShow.image?.medium || "/placeholder.jpg"}
                                    alt={topShow.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="ml-4">
                                    <span className="text-2xl font-bold text-gray-400 mr-4">#{index + 1}</span>
                                    <h3 className="text-lg font-semibold text-white">{topShow.name}</h3>
                                    <div className="flex items-center text-sm text-gray-400 mt-1">
                                        <p>{topShow.premiered ? new Date(topShow.premiered).getFullYear() : "N/A"}</p>
                                        <span className="mx-2">•</span>
                                        <p>{topShow.genres?.join(", ") || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PopularSeries;
