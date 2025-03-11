import { useEffect, useState } from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"
interface NetworkDataInterface {
    id: number;
    showName: string;
    language: string;
    genres: string[];
    status: string;
    runtime: string;
    rating: string;
    premiered: string;
    schedule: string;
    image: string | null;
    summary: string;
    network: {
        id: number | null;
        name: string;
        country: string;
        timezone: string;
        officialSite: string | null;
    } | null;
}

const SkeletonCard = () => {
    return (
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <Skeleton height={24} width={150} className="mb-2" />
            <Skeleton height={16} width={200} className="mb-4" />
            <Skeleton height={40} width={180} className="mt-4" />
        </div>
    );
};

const SkeletonGrid = () => {
    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </SkeletonTheme>
    );
};

const NetworkPage = () => {
    const [networkMoviesData, setNetworkMoviesData] = useState<NetworkDataInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchNetworkMovies = async () => {
            try {
                const response = await fetch("/api/getnetworkmovies");
                const data = await response.json();

                if (data.status === "success") {
                    const validData = data.data.filter((networkDataObject: NetworkDataInterface) =>
                        networkDataObject.network?.name &&
                        networkDataObject.network?.country &&
                        networkDataObject.network?.timezone
                    );

                    setNetworkMoviesData(validData);
                } else {
                    console.error("Error fetching network data:", data.error);
                }
            } catch (error) {
                console.error("Error fetching network data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNetworkMovies();
    }, []);

    if (loading) {
        return(
            <div className="px-20 pt-20 w-full h-full pt-28 mx-auto text-white rounded-lg">
                <h1 className="text-4xl font-bold mb-20 mt-16 text-center">Network Movies</h1>
                {loading ? <SkeletonGrid /> : <div>Data Loaded</div>}
            </div>
        )
    }

    if (networkMoviesData.length === 0) {
        return <p className="text-center text-red-500 text-xl font-semibold">No network data available.</p>;
    }
    const totalPages = Math.ceil(networkMoviesData.length / itemsPerPage);
    const newDataNetwork = networkMoviesData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="px-20 pt-20 w-full h-full pt-28 mx-auto text-white rounded-lg">
            <h1 className="text-4xl font-geogilica font-bold mb-20 mt-16 text-center">Network Movies</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newDataNetwork.map((network) => (
                    <div key={network.id} className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{network.network?.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            🌍 {network.network?.country} | 🕒 {network.network?.timezone}
                        </p>

                        {network.network?.officialSite && (
                            <a
                                href={network.network.officialSite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 block w-full text-center border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Visit Website
                            </a>
                        )}

                    </div>
                ))}

            </div>
            {totalPages > 1 && (
                <div className="mt-20 mb-20 flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-md text-white transition duration-300 ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-md transition duration-300 ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-md text-white transition duration-300 ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default NetworkPage;
