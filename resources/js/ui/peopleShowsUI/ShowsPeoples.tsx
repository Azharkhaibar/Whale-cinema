import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { motion } from 'framer-motion'

const PeopleShows = () => {
    const [showPeoples, setShowPeoples] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortCountryOption, setSortCountryOption] = useState("All");
    const [sortGenderOption, setSortGenderOption] = useState("All");
    const [sortByOption, setSortByOption] = useState("Most Popular");
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    useEffect(() => {
        axios.get("/api/getpeople")
            .then((res) => {
                if (Array.isArray(res.data?.PeopleShows) && res.data.PeopleShows.length > 0) {
                    setShowPeoples(res.data.PeopleShows);
                } else {
                    setShowPeoples([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(error.response?.data?.message || "Gagal fetching data");
            })
            .finally(() => {
                setLoadingData(false);
            });
    }, []);


    const uniqueCountries = [
        "All",
        ...new Set(showPeoples.map((people) => people.country?.name).filter(Boolean)),
    ];

    const uniqueGenders = ["All", "Male", "Female", "Other"];
    const sortOptions = ["Most Popular", "Least Popular", "A-Z", "Z-A"];

    const filteredPeople = showPeoples
        .filter((people) => {
            const matchesCountry = sortCountryOption === "All" || people.country?.name === sortCountryOption;
            const matchesGender = sortGenderOption === "All" || people.gender === sortGenderOption;
            return matchesCountry && matchesGender;
        })
        .sort((a, b) => {
            if (sortByOption === "Most Popular") return b.popularity - a.popularity;
            if (sortByOption === "Least Popular") return a.popularity - b.popularity;
            if (sortByOption === "A-Z") return a.name.localeCompare(b.name);
            if (sortByOption === "Z-A") return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <div className="w-full h-auto px-20">
            <h2 className="text-white text-3xl pt-36">People</h2>
            <div className="flex items-center mt-8 text-white space-x-5">
                <h3 className="text-xl">{loadingData ? "Tunggu bentar " : `${filteredPeople.length}`} Artist</h3>
                <div className="relative">
                    <button
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="bg-gray-700 px-4 rounded-md flex items-center"
                    >
                        {sortCountryOption} <ChevronDown className="ml-2 w-5 h-5" />
                    </button>
                    {isCountryDropdownOpen && (
                        <div className="absolute bg-gray-800 mt-2 rounded-md shadow-lg max-h-72 overflow-auto w-40">
                            {uniqueCountries.map((country) => (
                                <button
                                    key={country}
                                    className={`block w-full text-left px-4 hover:bg-gray-600 ${sortCountryOption === country ? 'bg-gray-600' : ''}`}
                                    onClick={() => {
                                        setSortCountryOption(country);
                                        setIsCountryDropdownOpen(false);
                                    }}
                                >
                                    {country}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
                        className="bg-gray-700 px-4 rounded-md flex items-center"
                    >
                        {sortGenderOption} <ChevronDown className="ml-2 w-5 h-5" />
                    </button>
                    {isGenderDropdownOpen && (
                        <div className="absolute bg-gray-800 mt-2 rounded-md shadow-lg w-40">
                            {uniqueGenders.map((gender) => (
                                <button
                                    key={gender}
                                    className={`block w-full text-left px-4 hover:bg-gray-600 ${sortGenderOption === gender ? 'bg-gray-600' : ''}`}
                                    onClick={() => {
                                        setSortGenderOption(gender);
                                        setIsGenderDropdownOpen(false);
                                    }}
                                >
                                    {gender}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                        className="bg-gray-700 px-4 rounded-md flex items-center"
                    >
                        {sortByOption} <ChevronDown className="ml-2 w-5 h-5" />
                    </button>
                    {isSortDropdownOpen && (
                        <div className="absolute bg-gray-800 mt-2 rounded-md shadow-lg w-40">
                            {sortOptions.map((option) => (
                                <button
                                    key={option}
                                    className={`block w-full text-left px-4 hover:bg-gray-600 ${sortByOption === option ? 'bg-gray-600' : ''}`}
                                    onClick={() => {
                                        setSortByOption(option);
                                        setIsSortDropdownOpen(false);
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap mt-10">
                {loadingData ? (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {Array.from({ length: 12 }).map((_, index) => (
                            <motion.div
                                key={index}
                                className="rounded-lg bg-gray-800 animate-pulse w-full h-[200px] rounded-md"
                                whileHover={{ scale: 1.05 }}
                            />
                        ))}
                    </motion.div>
                ) : error ? (
                    <p className="text-red-400 text-center text-lg">{error}</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {filteredPeople.map((people) => (
                            <div key={people.id} className="rounded-lg">
                                <img
                                    src={people.image?.medium || "https://via.placeholder.com/150"}
                                    alt={people.name}
                                    className="w-full cursor-pointer h-auto object-cover rounded-md"
                                />
                                <h2 className="text-white text-xl mt-3 font-geoligica">
                                    {people.name}
                                </h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeopleShows;
