const Footer = () => {
    return (
        <footer className="bg-[#0b1622] text-gray-400 py-20 px-20">
            <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Section */}
                <div className="font-geologica">
                    <h1 className="text-white text-3xl font-bold">WhaleCinema</h1>
                    <p className="mt-4">
                        Stream full seasons of exclusive series, current-season episodes, hit movies, kids shows, and more.
                    </p>
                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-blue-500 text-2xl hover:text-blue-400">F</a>
                        <a href="#" className="text-blue-400 text-2xl hover:text-blue-300">T</a>
                        <a href="#" className="text-blue-500 text-2xl hover:text-blue-400">in</a>
                    </div>
                </div>

                {/* Browse Section */}
                <div className="font-geologica">
                    <h2 className="text-white font-bold text-lg">Browse</h2>
                    <div className="border-t border-gray-500 w-16 my-2"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="#" className="hover:text-white">Streaming</a>
                        <a href="#" className="hover:text-white">Live Sports</a>
                        <a href="#" className="hover:text-white">TV Shows</a>
                        <a href="#" className="hover:text-white">Live News</a>
                        <a href="#" className="hover:text-white">Movies</a>
                        <a href="#" className="hover:text-white">Live TV</a>
                    </div>
                </div>

                {/* Support Section */}
                <div className="font-geologica">
                    <h2 className="text-white font-bold text-lg">Support</h2>
                    <div className="border-t border-gray-500 w-16 my-2"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="#" className="hover:text-white">Help Desk</a>
                        <a href="#" className="hover:text-white">Accessibility</a>
                        <a href="#" className="hover:text-white">Billing</a>
                        <a href="#" className="hover:text-white">Subscribe</a>
                        <a href="#" className="hover:text-white">Pricing</a>
                        <a href="#" className="hover:text-white">Devices</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-600 mt-8"></div>
            <div className="text-center text-sm text-gray-500 mt-4">
                ©2023 AzharKhaibar. Designed by My Self. All Rights Reserved.
                <a href="#" className="hover:text-white ml-2">Privacy Policy</a>
            </div>
        </footer>
    );
};

export default Footer;
