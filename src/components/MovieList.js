import MovieCard from "./MovieCard";

const MovieList = ({title, movies}) => {
    console.log(movies);
    if(!movies) return;
    return(
      <div className="px-4  mb-4 bg-black">
        <div>
            <h1 className = "font-bold text-3xl  text-white py-6 m-2">{title}</h1>
        </div>
        <div className="flex overflow-x-scroll ">
        <div className = "flex gap-4 cursor-pointer">
            {movies.map(movie => <MovieCard  key = {movie.id} posterPath={movie.poster_path}/>)}
            
        </div>
      </div>
      </div>
        
    )
}

export default MovieList;