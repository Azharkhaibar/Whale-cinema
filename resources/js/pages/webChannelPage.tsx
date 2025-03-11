import MoviesChannel from "../ui/browseUI/webNetworkMovies"
import Footer from "../ui/FooterMovieWeb"
const WebChannel:React.FC = () => {
    return(
        <div className="bg-[#0c1e35]">
            <MoviesChannel />
            <Footer />
        </div>
    )
}

export default WebChannel
