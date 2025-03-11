import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="absolute z-50 top-0 left-0 w-full bg-transparent backdrop-blur-sm text-white p-4 px-20">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-yellow-500">
                    WhaleCinema
                </Link>
                <ul className="hidden md:flex space-x-10">
                    <li>
                        <Link to="/" className="hover:text-yellow-400 text-lg">Home</Link>
                    </li>
                    <li className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="hover:text-yellow-400 text-lg focus:outline-none"
                        >
                            Browse ▼
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
                        <Link to="/movies" className="hover:text-yellow-400 text-lg">Movies</Link>
                    </li>
                    <li>
                        <Link to="/tv-series" className="hover:text-yellow-400 text-lg">TV Series</Link>
                    </li>
                    <li>
                        <Link to="/fse" className="hover:text-yellow-400 text-lg">FSE</Link>
                    </li>
                    <li>
                        <Link to="/blog" className="hover:text-yellow-400 text-lg">Blog</Link>
                    </li>
                </ul>

                {/* Register Button */}
                <button className="ml-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition">
                    Register Now
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
