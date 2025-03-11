import { useEffect, useState } from "react";

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

const NetworkPage = () => {
    const [networkMoviesData, setNetworkMoviesData] = useState<NetworkDataInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        fetch("/api/getnetworkmovies")
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    const validData = data.data.filter((networkDataObject: NetworkDataInterface) =>
                        networkDataObject.network?.name &&
                        networkDataObject.network?.country &&
                        networkDataObject.network?.timezone
                    );

                    setNetworkMoviesData(validData);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching network data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center text-gray-400">Loading network data...</p>;
    }

    if (networkMoviesData.length === 0) {
        return <p className="text-center text-red-500 text-xl font-semibold">No network data available.</p>;
    }
    const totalPages = Math.ceil(networkMoviesData.length / itemsPerPage);
    const newDataNetwork = networkMoviesData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="px-20 pt-20 w-full h-full pt-28 mx-auto text-white rounded-lg shadow-lg">
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
