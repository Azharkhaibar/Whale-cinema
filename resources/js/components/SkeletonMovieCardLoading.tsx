export const SkeletonMovieCard = () => {
    return (
        <div className="animate-pulse p-4 rounded-md shadow-md h-auto">
            <div className="bg-gray-800 h-64 w-full rounded-xl"></div>
            <div className="bg-gray-700 h-6 w-3/4 mx-auto mt-4 rounded"></div>
            <div className="flex items-center space-x-3 mt-2">
                <div className="bg-gray-700 h-5 w-16 rounded"></div>
                <div className="bg-gray-700 h-5 w-24 rounded"></div>
            </div>
        </div>
    );
};

export const SkeletonCardPopularTV = () => {
    return (
        <div className="animate-pulse p-4 rounded-md shadow-md">
            <div className="bg-gray-800 h-48 w-full rounded-xl"></div>
            <div className="bg-gray-700 h-6 w-3/4 mx-auto mt-4 rounded"></div>
            <div className="flex justify-between items-center mt-2">
                <div className="bg-gray-700 h-5 w-20 rounded"></div>
                <div className="bg-gray-700 h-5 w-12 rounded"></div>
            </div>
        </div>
    );
};

export const SkeletonTopShowCard = () => {
    return (
        <div className="animate-pulse bg-transparent p-4 rounded-lg shadow-md flex items-center">
            <div className="w-20 h-20 bg-gray-800 rounded-lg"></div>
            <div className="ml-4 w-full">
                <div className="bg-gray-700 h-6 w-1/2 rounded"></div>
                <div className="flex items-center space-x-2 mt-2">
                    <div className="bg-gray-700 h-5 w-12 rounded"></div>
                    <div className="bg-gray-700 h-5 w-16 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export const SkeletonPopularMoviesWhale = () => {
    return (
        <div className="animate-pulse p-2 rounded-md shadow-md h-auto">
            {/* Placeholder untuk gambar */}
            <div className="bg-gray-800 h-64 w-full rounded-xl"></div>

            {/* Placeholder untuk judul */}
            <div className="bg-gray-700 h-6 w-3/4 mx-auto mt-6 rounded"></div>

            {/* Placeholder untuk tahun & genre */}
            <div className="flex items-center space-x-3 mt-2">
                <div className="bg-gray-700 h-5 w-12 rounded"></div>
                <div className="bg-gray-700 h-5 w-20 rounded"></div>
            </div>
        </div>
    );
};

