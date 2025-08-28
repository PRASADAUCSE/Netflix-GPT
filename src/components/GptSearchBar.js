import { useDispatch, useSelector } from "react-redux";
import lang from "../Utils/languageConstants";
import { useRef } from "react";
import openai from "../Utils/openAI"
import { API_Options } from "../Utils/constants";
import { addGptMoviesResult } from "../Utils/gptSlice";


const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_Options);
        
        if (!data.ok) {
            const errorText = await data.text();
            console.error("TMDB Search API Request Failed with Status:", data.status, "Response:", errorText);
            throw new Error(`HTTP error! Status: ${data.status} - ${errorText.substring(0, 100)}...`);
        }

        const json = await data.json();
        return json.results;
    }

    const handleGptSearchClick = async () => {
        const gptQuery = "Act as a movie Recommendation system and suggest some movies for the query" +
            searchText.current.value + 
            " . Only give me names of top 5 movies, comma separated. like the example result given ahead. Example Result: Don, Kick, Shadow,  8 Vasantalu, Koi Mil Gaya";

      try {
        const getResults = await openai.chat.completions.create({
          messages: [{ role: 'user', content: gptQuery}],
          model: 'gpt-3.5-turbo',
        });

        const gptMovies = getResults?.choices[0]?.message?.content.split(",").map(movie => movie.trim()); // Trim whitespace
        
        // Handle cases where GPT might return less than 5 or malformed suggestions
        if (!gptMovies || gptMovies.length === 0) {
            console.warn("GPT did not return valid movie names.");
            dispatch(addGptMoviesResult({ movieNames: [], movieResults: [] }));
            return;
        }

        const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie)); 
        const tmdbResults = await Promise.all(promiseArray);
        
        dispatch(addGptMoviesResult({movieNames: gptMovies, movieResults: tmdbResults}));

      } catch (error) {
        console.error("GPT or TMDB API call failed:", error);
        // Optionally dispatch an error state or clear results
        dispatch(addGptMoviesResult({ movieNames: [], movieResults: [] }));
      }
    };

    return(
        // Responsive padding top, centers the form horizontally
        <div className="pt-[40%] md:pt-[18%] flex justify-center w-full">
            <form 
                className="w-11/12 md:w-1/2 lg:w-1/3 bg-black grid grid-cols-12 p-4 md:p-6 rounded-lg shadow-xl bg-opacity-80" 
                onSubmit = {(e) => e.preventDefault()}
            >
                <input 
                    ref={searchText}
                    type = "text" 
                    className="p-3 md:p-4 col-span-9 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600" 
                    placeholder={lang[langKey].searchPlaceholder}
                />
                <button 
                    className="col-span-3 py-3 md:py-4 px-2 md:px-4 bg-red-700 text-white rounded-r-lg text-sm md:text-base font-bold hover:bg-red-800 transition-colors duration-200" 
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;
