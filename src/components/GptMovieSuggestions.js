import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Shimmer from "../Utils/Shimmer";

const GptMovieSuggestions = () => {
    const gpt = useSelector(store => store.gpt);
    const {movieResults, movieNames, isLoading} = gpt; // ✅ Get isLoading state

    // If we are currently loading, show the shimmer
    if (isLoading) return <Shimmer/>;

    // If not loading, check if there are movies to display
    if (!movieNames || movieNames.length === 0) return null; // Or a message like "No movies found."

    return(
        <div className="p-4 md:p-8 m-4 md:m-0 mt-16 md:-mt-52 relative z-20 bg-black text-white bg-opacity-90 md:bg-opacity-80 rounded-xl shadow-2xl mx-auto w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
            <div>
                {movieNames.map((movieName, index) => (
                    <MovieList 
                        key={movieName} 
                        title={movieName} 
                        movies={movieResults[index]}
                    />
                ))}
            </div>
        </div>
    )
}

export default GptMovieSuggestions;
