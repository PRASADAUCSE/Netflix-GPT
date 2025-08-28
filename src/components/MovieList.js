import MovieCard from "./MovieCard"; // This import is not used in the provided code, MovieCardWithTrailer is used instead. Keeping for now.
import MovieCardWithTrailer from "./MovieCardWithTrailer";

const MovieList = ({title, movies}) => {
    if (!movies || movies.length === 0) return null; // Ensure movies is not empty

    return(
      <div className="px-4 md:px-6 mt-4 md:mt-0"> {/* Responsive padding and top margin */}
        <div>
            <h1 className="font-bold text-xl md:text-3xl text-white py-4 md:py-6 ml-2"> {/* Responsive font size and padding */}
                {title}
            </h1>
        </div>
        <div className="flex overflow-x-scroll no-scrollbar"> {/* Horizontal scroll with custom scrollbar hiding */}
            <div className="flex gap-4 cursor-pointer"> {/* Gap between movie cards */}
                {movies.map(movie => (
                    movie && movie.id ? ( // Ensure movie and its ID exist
                        <MovieCardWithTrailer key={movie.id} movie={movie} />
                    ) : null
                ))}
            </div>
        </div>
      </div>
    );
};

export default MovieList;
