import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTItle";
import Header from "./Header";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    // If movies array is null, undefined, or has less than 2 movies, return early.
    // We need at least two movies because mainMovie is set to movies[1].
    if (!movies || movies.length < 2) return null; 

    // Using the second movie (index 1) for the main display
    const mainMovie = movies[1];
    const {original_title, overview, id} = mainMovie;

    return(
        // This div ensures the main container takes the full screen width
        // and maintains a 16:9 aspect ratio, which is typical for video content.
        // overflow-hidden prevents any content from spilling out.
        
        <div className="w-screen aspect-video overflow-hidden">
            <VideoTitle title = {original_title} overview = {overview}/>
            <VideoBackground  movieId ={id}/>
        </div>
    )
}

export default MainContainer;
