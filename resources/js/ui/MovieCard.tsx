import React from "react";

interface MovieCardProps {
    id: number;
    title: string;
    poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden w-64">
            <img src={poster} alt={title} className="w-full h-96 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <a href={`/movie/${id}`} className="text-blue-400 hover:underline">
                    View Details
                </a>
            </div>
        </div>
    );
};

export default MovieCard;
