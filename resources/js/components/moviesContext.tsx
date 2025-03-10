import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface MovieContextType {
    WhalePopularMovies: any[];
    loading: boolean;
    error: boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
    const [WhalePopularMovies, setWhalePopularMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get("/api/getpopularmoviespage")
            .then((res) => {
                setWhalePopularMovies(res.data.movies.slice(0, 15));
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    return (
        <MovieContext.Provider value={{ WhalePopularMovies, loading, error }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovies = () => {
    const context = useContext(MovieContext);
    if (!context) throw new Error("useMovies must be used within a MovieProvider");
    return context;
};
