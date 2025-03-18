import React from "react";

export const HeaderHeroHome = () => {
    return (
        <div
            className="w-full h-screen relative flex items-center justify-center"
            style={{
                backgroundImage: "linear-gradient(to bottom, #0B0A0F, #2E1A47, #845EC2, #FFCC99)",
            }}
        >

            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 text-white text-center">
                <h1 className="text-4xl md:text-[55px] leading-[100%] font-bold font-geologica">
                    Get endless entertainment, and the <br /> shows and movies you love.
                </h1>
                <p className="mt-4 text-lg md:text-xl">
                    Stream full seasons of exclusive series, current-season episodes, <br />
                    hit movies, Dali originals, kids shows, and more.
                </p>
                <button className="p-3 py-2 px-8 text-[18px] text-center bg-blue-700 rounded-full mt-6 hover:bg-blue-800 transition">
                    Start Free Trial
                </button>
            </div>
        </div>
    );
};
