import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    if(!movies) return;
    console.log(movies);
    return(
        
        <div className = "-mt-60 bg-black relative z-20">
            <MovieList title = {"Now Playing"} movies = {movies.nowPlayingMovies}/>
            <MovieList title = {"Top Rated"} movies = {movies.topRatedMovies}/>
            <MovieList title = {"Upcoming Movies"} movies = {movies.upcomingMovies}/>
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