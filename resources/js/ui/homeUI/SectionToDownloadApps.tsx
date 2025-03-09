const SectionDownload: React.FC = () => {
    return(
        <section className="mt-36 bg-gradient-to-r from-teal-400 to-purple-300 text-center py-28 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-geologica">
                    The world's leading subscription service for movies and TV shows in one app
                </h1>
                <p className="text-gray-700 mt-4 text-lg">
                    Now available on App Store and Play Store
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    <a href="#" className="w-40">
                        <img src="/appstore.png" alt="Download on App Store" className="w-full" />
                    </a>
                    <a href="#" className="w-40">
                        <img src="/googleplay.png" alt="Get it on Google Play" className="w-full" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default SectionDownload
