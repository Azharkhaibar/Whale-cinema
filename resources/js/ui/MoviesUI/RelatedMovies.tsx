import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RelatedMovieViews: React.FC<{movieId:number}> = ({ movieId }) => {
    const [ getRelatedMoviesView, setGetRelatedMoviesView ] = useState<any[]>([])
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate();
    const [ error, setError ] = useState<string | null>(null)
    useEffect(() => {
            if(!movieId) return;
            setLoading(true)
            setError(null)
            axios.get(`/api/getrelatedmovie/${movieId}`)
            .then((response) => {
                console.log('Response API Movie berdasarkan Genres : ', response.data);

                if(response.data?.related_movies?.length) {
                    setGetRelatedMoviesView(response.data.related_movies)
                } else {
                    setError('kgk ada yg relate movienya')
                }
            }).catch(()=>{
                setError('gagal untuk dapet movie yg related')
            }).finally(()=>{
                setLoading(false)
            })
    }, [movieId])

    if (loading) {
        return (
            <div className="text-center font-2xl text-white">
                <h3>Loading Data Euyyy</h3>
            </div>
        )
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }
    return (
        <div className="grid grid-cols-2 h-auto md:grid-cols-3 lg:grid-cols-7 gap-6 px-20 p-4">
            {getRelatedMoviesView.map((movie) => (
                <div key={movie.id} className="rounded-lg shadow-md cursor-pointer" onClick={() => navigate(`/movies/${movie.id}`)}>
                    <img
                        src={movie.image}
                        alt={movie.name}
                        className="w-full max-h-96 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-bold mt-2">{movie.name}</h3>
                    <p className="text-sm text-gray-400">Rating: {movie.rating}</p>
                </div>
            ))}
        </div>
    );

}

export default RelatedMovieViews
