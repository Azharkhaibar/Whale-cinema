import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar: React.FC = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", search);
        // Implementasikan pencarian film di sini
    };

    return (
        <nav className="absolute top-0 left-0 w-full bg-transparent backdrop-blur-sm text-white p-4 px-6 shadow-md z-10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-yellow-500">
                    MovieDB
                </Link>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-10">
                    <li><Link to="/" className="hover:text-yellow-400 text-lg">Home</Link></li>
                    <li><Link to="/popular" className="hover:text-yellow-400 text-lg">Browse</Link></li>
                    <li><Link to="/movies" className="hover:text-yellow-400 text-lg">Movies</Link></li>
                    <li><Link to="/tv-series" className="hover:text-yellow-400 text-lg">TV Series</Link></li>
                    <li><Link to="/fse" className="hover:text-yellow-400 text-lg">FSE</Link></li>
                    <li><Link to="/blog" className="hover:text-yellow-400 text-lg">Blog</Link></li>
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
