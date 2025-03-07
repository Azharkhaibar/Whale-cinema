import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../ui/navbar";

type MovieProps = {
    id: number;
    title: string;
    poster: string;
};

const MovieCard: React.FC<MovieProps> = ({ id, title, poster }) => {
    return (
        <div className="">
            <Navbar />
            <div className="">
                
            </div>
        </div>
        // <div className="border p-2 rounded-lg shadow">
        //     <img src={poster} alt={title} className="w-full h-auto rounded" />
        //     <h2 className="mt-2 font-bold">{title}</h2>
        //     <Link to={`/movie/${id}`} className="text-blue-500">
        //         View Details
        //     </Link>
        // </div>
    );
};

export default MovieCard;
