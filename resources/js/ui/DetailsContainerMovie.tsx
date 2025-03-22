import { useEffect, useState } from "react";
import axios from "axios";
import { MovieInformation } from "../lib/movieInformationInterface";
export const DetailsContainer: React.FC<MovieInformation> = ({movie}) => {
    return(
        <div className="w-full h-auto p-4 bg-gray-600">
            <p>{movie.name}</p>
            <p>{movie.premiered}</p>
        </div>
    )
}

// BELUM DI LANJUTKAN
