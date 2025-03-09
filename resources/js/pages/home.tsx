import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderHeroHome } from "../ui/homeUI/HeaderHeroHome";
import PopularMoviesList from "../ui/homeUI/popularMoviesStream";
import PopularSeries from "../ui/homeUI/PopularTvSeries";
import MiddleHeader from "../ui/homeUI/AddMiddleHeader";
import ListChangeableNavbar from "../ui/homeUI/ListChangeableMovies";
const Home: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows?page=1")
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data);
                setMovies(data);
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    return (
        <div className="bg-[#0c1e35]">
            <HeaderHeroHome />
            <PopularMoviesList />
            <PopularSeries />
            <MiddleHeader />
            <ListChangeableNavbar />
            {/* <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <h2>{movie.name}</h2>
                        <img src={movie.image?.medium || ""} alt={movie.name} />
                        <Link to={`/movies/${movie.id}`} className="text-blue-500" onClick={() => console.log(movie.id)}>
                            Views Details
                        </Link>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Home;
