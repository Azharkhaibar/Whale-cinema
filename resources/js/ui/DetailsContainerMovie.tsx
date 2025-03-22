import { useEffect, useState } from "react";
import axios from "axios";
import { MovieInformation } from "../lib/movieInformationInterface";
interface MovieInformationProps {
    movie: MovieInformation
}
export const DetailsContainer: React.FC<MovieInformationProps> = ({movie}) => {
    return (
            <div className="w-full h-auto overflow-hidden bg-blue-900/10 shadow-md rounded-xl flex">
                <div className="w-2/12">
                    <img
                        src={movie?.image?.original}
                        alt={movie.name}
                        className="w-96 h-auto object-cover"
                    />
                </div>
                <div className="w-11/12 p-4">
                    <h2 className="text-white text-2xl font-bold font-geologica">
                        {movie.name}
                    </h2>
                    <p
                        className="text-white text-md font-medium pt-4 font-geologica"
                        dangerouslySetInnerHTML={{
                            __html:
                                movie?.summary ||
                                "<p>No summary available.</p>",
                        }}
                    ></p>
                    <div className="flex space-x-72 pt-4">
                        <div>
                            <p>
                                <span style={{opacity: 0.4}}>Country</span> :{" "}
                                {movie?.network?.country?.name || "N/A"}
                            </p>
                            <p><span style={{opacity: 0.4}}>Premiered</span> : {movie.premiered || "N/A"}</p>
                            <p><span style={{opacity: 0.4}}>Episode</span> : </p>
                            <p><span style={{opacity: 0.4}}>Studio</span> : {movie?.network?.name || "N/A"}</p>
                            <p><span style={{opacity: 0.4}}>Status</span> : {movie.status || "N/A"}</p>
                        </div>
                        <div>
                            <p>
                                <span style={{opacity: 0.4}}>Genres</span> :{" "}
                                {movie.genres && movie.genres.length > 0
                                    ? movie.genres.join(", ")
                                    : "N/A"}
                            </p>
                            <p><span style={{opacity: 0.4}}>Status</span> : {movie.status || "N/A"}</p>
                            <p><span style={{opacity: 0.4}}>Rating</span> : {movie.rating?.average || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}

// BELUM DI LANJUTKAN
