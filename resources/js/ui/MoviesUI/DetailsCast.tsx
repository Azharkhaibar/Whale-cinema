import React from "react";

interface DetailMovieProps {
    movie: {
        schedule: string;
        network: string;
        officialSite: string;
    };
    cast: {
        actor_name: string;
        actor_profile: string;
        actor_image: string;
        character_name: string;
        character_image: string;
        character_profile: string;
    }[];
}

const DetailMovieAndCast: React.FC<DetailMovieProps> = ({ movie, cast }) => {
    return (
        <div className="text-white px-20 z-99 w-full h-auto">
            {/* More Details */}
            {/* <h2 className="text-3xl font-bold mb-4">More Details</h2>
            <ul className="text-lg mb-6">
                <li><strong>Schedule:</strong> {movie.schedule}</li>
                <li><strong>Network:</strong> {movie.network}</li>
                <li>
                    <strong>Official Site:</strong>{" "}
                    <a href={movie.officialSite} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                        Visit Here
                    </a>
                </li>
            </ul> */}

            {/* Cast List */}
            <h2 className="text-3xl z-60 text-white  font-geologica font-bold mb-4">Cast and Crew</h2>
            <div className="flex justify-center gap-6 overflow-hidden">
                {cast.map((member, index) => (
                    <div key={index} className="flex flex-col items-center w-36">
                        <img
                            src={member.actor_image}
                            alt={member.actor_name}
                            className="w-[120px] h-[120px] rounded-full object-cover"
                        />
                        <h3 className="mt-2 text-base font-semibold">{member.actor_name}</h3>
                        <p className="text-gray-400 text-sm">{member.character_name}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DetailMovieAndCast;
