const MiddleHeader = () => {
    return (
        <div className="w-full h-96 mt-20 text-white bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/img/movie.png')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="flex items-center justify-center h-full relative z-10">
                <div className="text-center px-4 md:px-10">
                    <h2 className="text-5xl font-semibold mb-6 w-10/12 mx-auto">
                        Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
                    </h2>
                    <button className="rounded-full bg-blue-600 text-white py-2 px-6 text-lg">
                        Get started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MiddleHeader;
