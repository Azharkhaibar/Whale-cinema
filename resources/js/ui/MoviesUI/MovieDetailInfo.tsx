import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import Footer from "../FooterMovieWeb";
import DetailMovieAndCast from "./DetailsCast";
import RelatedMovieViews from "./RelatedMovies";
import PricingTable from "../PricingTable";
import { CirclePlay } from "lucide-react";

const MovieDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [DetailListOption, setDetailListOption] = useState("Related");
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`/api/getmoviedetail/${id}`)
            .then((res) => {
                if (res.data?.data) {
                    setMovie(res.data.data);
                } else {
                    setError("Movie not found.");
                }
            })
            .catch(() => setError("Failed to fetch movie details."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <motion.div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
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
        <div className="relative w-full h-screen text-white bg-[#0c1e35]">
            <div
                className="absolute inset-0 z-[0] bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${movie?.image?.original || '/default-movie.jpg'})` }}
            />
            <div className="absolute inset-0 z-[0] bg-black/60" />
            <div className="relative z-10 px-6 py-20 md:px-16 lg:px-20 max-w-4xl">
                <button
                    onClick={() => navigate("/movies")}
                    className="flex pt-10 items-center gap-2 mb-16 text-white hover:text-gray-300 transition"
                >
                    <FaArrowLeft /> Back to Movies
                </button>
                <h1 className="text-6xl md:text-5xl font-bold mb-4 font-geoligica">
                    {movie.name}
                </h1>
                <div className="mt-4 flex flex-wrap gap-4">
                    {movie.genres.map((genre: string, index: number) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-500/50 border-gray-500/20 rounded-full text-sm"
                        >
                            {genre}
                        </span>
                    ))}
                    <span className="text-lg rounded-full">{movie.status}</span>
                    <span className="text-lg rounded-full">{movie.runtime} min</span>
                    <span className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        {movie.rating?.average || "N/A"}
                    </span>
                </div>
                <div className="mt-6 text-lg leading-relaxed opacity-90 mb-8">
                    <span dangerouslySetInnerHTML={{ __html: movie.summary }} />
                </div>

                {/* Action Buttons */}
                <div className="flex text-white font-bold text-xl items-center space-x-4">
                    <button className="bg-yellow-500 py-2 px-8 rounded-full flex items-center space-x-2">
                        <CirclePlay size={24} />
                        <span>Play Now</span>
                    </button>
                    <button className="bg-gray-400/30 py-2 border border-white/30 px-8 rounded-full flex items-center space-x-2">
                        <CirclePlay size={24} />
                        <span>Watch Trailer</span>
                    </button>
                </div>
            </div>

            {/* Navigation for Movie Details */}
            <div className="relative z-20 flex mb-10 px-20 font-geologica items-center text-3xl space-x-10 border-b-2 border-white/20 w-full h-auto">
                {["Details", "Related", "Extras"].map((detail) => (
                    <h2
                        key={detail}
                        onClick={() => setDetailListOption(detail)}
                        className={`cursor-pointer transition-all text-2xl font-bold duration-500 relative pb-2
                    ${DetailListOption === detail ? "text-white border-b-4 border-yellow-500" : "hover:text-blue-500"}`}
                    >
                        {detail}
                    </h2>
                ))}
            </div>

            {/* Conditional Rendering for Detail Sections */}
            <div className="relative z-10 w-full mb-10 h-auto">
                {DetailListOption === "Details" && (
                    <DetailMovieAndCast movie={movie} cast={movie.cast} />
                )}
                {DetailListOption === "Related" && (
                    <RelatedMovieViews movieId={movie.id} />
                )}
            </div>
            <PricingTable />
            <Footer />
        </div>
    );
};

export default MovieDetail;
