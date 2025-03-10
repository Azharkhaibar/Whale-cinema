export default function LastHeader() {
    return (
        <div
            className="relative mt-20 w-full h-[500px] bg-cover bg-center flex items-center justify-center text-center"
            style={{
                backgroundImage: `url('https://img.freepik.com/premium-photo/fridays-are-movie-nights-with-family-shot-unrecognizable-family-sitting-sofa-home-together-bonding-while-watching-tv_590464-58777.jpg')`,
                backgroundColor: "#0B1E36",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 max-w-2xl text-white px-6">
                <h2 className="font-geologica text-4xl font-bold leading-tight">
                    The world's leading subscription service for
                    movies and TV shows in one app
                </h2>
                <p className="mt-4 text-lg">
                    Now available on App Store and Play Store
                </p>
                <div className="flex gap-4 mt-6 justify-center">
                    <a href="#" className="inline-block">
                        <img src="/assets/app-store.png" alt="Download on the App Store" className="h-12" />
                    </a>
                    <a href="#" className="inline-block">
                        <img src="/assets/google-play.png" alt="Get it on Google Play" className="h-12" />
                    </a>
                </div>
            </div>
        </div>
    );
}
