import React from "react";

export const HeaderHeroHome = () => {
    return (
        <div className="bg-black w-full h-screen relative flex items-center justify-center">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

            {/* Konten di dalam hero section (opsional) */}
            <div className="relative z-10 text-white text-center">
                <h1 className="text-4xl md:text-[55px] leading-[100%] font-bold">Get endless entertainment, and the<br /> shows and movies you love.</h1>
                <p className="mt-4 text-lg md:text-xl">Stream full seasons of exclusive series, current-season episodes,<br /> hit movies, Dali originals, kids shows, and more.</p>
                <button className="p-3 py-2 px-8 text-[18px] text-center bg-blue-700 rounded-full mt-6">
                    Start Free Trial
                </button>
            </div>
        </div>
    );
};
