const MiddleHeader = () => {
    return (
        <div className="w-full min-h-[500px] md:min-h-[700px] mt-20 text-white bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
            style={{ backgroundImage: "url('/img/movie.png')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>              <div className="relative z-10 text-center max-w-[85%] md:max-w-[60%]">
                <h2 className="text-4xl md:text-6xl font-semibold mb-6 font-geologica leading-tight">
                    Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
                </h2>
                <button className="rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 px-8 text-lg md:text-xl">
                    Get started
                </button>
            </div>
        </div>
    );
};

export default MiddleHeader;
