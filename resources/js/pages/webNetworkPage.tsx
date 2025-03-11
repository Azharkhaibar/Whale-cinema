import MoviesNetwork from "../ui/browseUI/webNetworkMovies"
import Footer from "../ui/FooterMovieWeb"
const WebChannel: React.FC = () => {
    return (
        <div className="bg-[#0c1e35]">
            <MoviesNetwork />
            <Footer />
        </div>
    )
}

export default WebChannel
