import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import shimmer from "../Utils/shimmer";

const GptMovieSuggestions = () => {
    const gpt = useSelector(store => store.gpt);
    const {movieResults, movieNames} = gpt;
    if (!movieNames || movieNames.length < 2) return shimmer(); // 👈 correct

    return(
        <div className="p-4 m-4 bg-black text-white bg-opacity-70">
            <div>
                {movieNames.map((movieName, index) => <MovieList key = {movieName} title = {movieName}  movies = {movieResults[index]}/>)}
                
            </div>
        </div>
    )
}

export default GptMovieSuggestions;