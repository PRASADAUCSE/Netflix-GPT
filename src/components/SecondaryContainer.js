import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    if(!movies) return;
    
    return(
        // Responsive top margin to overlap the main video, adjusting for smaller screens
        // Responsive padding for the entire container
        <div className="bg-black -mt-50 md:-mt-60 relative z-20 px-4 md:px-8">
            <MovieList title={"Now Playing"} movies = {movies.nowPlayingMovies}/>
            <MovieList title = {"Upcoming Movies"} movies = {movies.upcomingMovies}/>
            <MovieList title = {"Top Rated"} movies = {movies.topRatedMovies}/>
            <MovieList title = {"Popular"} movies = {movies.popularMovies}/>
        </div>
    )
}

export default SecondaryContainer;



/*
        Movie list- Trending
        Movie list - Popular
        ----
*/