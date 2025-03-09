import { useState } from "react";
import AllMovies from "../../components/ActiveListSection/AllCategoryList";
import FeaturedMovies from "../../components/ActiveListSection/FeaturedMoviesCategoryList";

export default function ListChangeableNavbar() {
    const [activeChangeableListSection, setActiveChangeableListSection] = useState("All");

    return (
        <div className="w-full h-full mx-auto mt-20 mb-0">
            <div className="flex font-geologica items-center text-white space-x-6 text-center justify-center text-2xl">
                {["All", "Featured", "Most Popular", "Recently Added"].map((categoryActiveSection) => (
                    <h3 key={categoryActiveSection}
                        onClick={() => setActiveChangeableListSection(categoryActiveSection)}
                        className={`cursor-pointer px-4 py-2 transition-all duration-300
                            ${activeChangeableListSection === categoryActiveSection ? "text-blue-500 border-b-2 border-blue-500" : "hover:text-blue-300"}`}
                    >
                        {categoryActiveSection}
                    </h3>
                ))}
            </div>

            <div className="mb-0">
                {activeChangeableListSection === "All" && <AllMovies />}
                {activeChangeableListSection === "Featured" && <FeaturedMovies />}
            </div>
        </div>
    );
}
