import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesDetail } from "../api/movieApi";

const MovieDetail: React.FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>(null);

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((res)=>res.json())
        .then((data)=> setMovie(data))
        .catch((err)=> console.error("Error :", err));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold">{movie.name}</h1>
            <img src={movie.image?.original || ""} alt={movie.name} className="w-full" />
            <p dangerouslySetInnerHTML={{ __html: movie.summary }}></p>
            <p><strong>Genres:</strong> {movie.genres?.join(", ")}</p>
            <p><strong>Premiered:</strong> {movie.premiered}</p>
            <p><strong>Rating:</strong> {movie.rating?.average || "N/A"}</p>
        </div>
    );
};

export default MovieDetail;
