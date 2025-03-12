import AllMoviesShows from "../ui/allMoviesUI/allMoviesPageShows"
import Footer from "../ui/FooterMovieWeb"
const AllMoviesPage: React.FC = () => {
    return (
        <div className="bg-[#0c1e35]">
            <AllMoviesShows />
            <Footer />
        </div>
    )
}

export default AllMoviesPage
