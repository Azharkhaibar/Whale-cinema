import MoviesHeaderBrowse from "../ui/browseUI/HeaderMoviesPageBrowser"
import LastHeader from "../ui/browseUI/lastHeaderHero"
import SectionMoviesByCategory from "../ui/browseUI/sectionMoviesByCategory"
import GetPremiumMovies from "../ui/browseUI/sectionPremiumMovies"
import Footer from "../ui/FooterMovieWeb"
const MoviesPage: React.FC = () => {
    return(
        <div className="bg-[#0c1e35]">
            <MoviesHeaderBrowse />
            <SectionMoviesByCategory />
            <GetPremiumMovies />
            <LastHeader />
            <Footer />
        </div>
    )
}

export default MoviesPage
