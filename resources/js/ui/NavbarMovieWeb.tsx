import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react"; // Import ikon dari Lucide

const Navbar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <nav className="fixed top-0 left-0 w-full bg-blue-600/10 backdrop-blur-md text-white p-4 px-20 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo & Navigation */}
                <div className="flex items-center space-x-10">
                    <Link to="/" className="text-2xl font-bold text-yellow-500">
                        WhaleCinema
                    </Link>
                    <ul className="hidden md:flex space-x-8">
                        <li>
                            <Link to="/" className="hover:text-yellow-400 text-lg">Home</Link>
                        </li>
                        <li className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="hover:text-yellow-400 text-lg focus:outline-none flex items-center space-x-1"
                            >
                                <span>Browse</span>
                                <ChevronDown size={20} className="pt-1" />
                            </button>

                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-40 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
                                    <li>
                                        <Link to="/movies" className="block px-4 py-2 hover:bg-gray-200">
                                            Movies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/webchannel" className="block px-4 py-2 hover:bg-gray-200">
                                            Web Channel
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/webnetwork" className="block px-4 py-2 hover:bg-gray-200">
                                            Network
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to="/allmovies" className="hover:text-yellow-400 text-lg">Movies</Link>
                        </li>
                        <li>
                            <Link to="/tv-series" className="hover:text-yellow-400 text-lg">TV Series</Link>
                        </li>
                        <li>
                            <Link to="/people" className="hover:text-yellow-400 text-lg">Artist</Link>
                        </li>
                        <li>
                            <Link to="/blog" className="hover:text-yellow-400 text-lg">Blog</Link>
                        </li>
                    </ul>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-full shadow-md w-96">
                        <Search className="text-gray-400 mr-2" size={20} />
                        <input
                            type="text"
                            placeholder="Search for movies or videos"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                        />
                    </div>

                    {/* Register Button */}
                    <button className="px-5 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition">
                        Register Now
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
