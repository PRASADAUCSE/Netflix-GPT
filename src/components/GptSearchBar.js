import { useDispatch, useSelector } from "react-redux";
import lang from "../Utils/languageConstants";
import { useRef } from "react";
import openai from "../Utils/openAI"
import { API_Options } from "../Utils/constants";
import { addGptMoviesResult, setLoading, unsetLoading } from "../Utils/gptSlice";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_Options);
        const json = await data.json();

        return json.results;
    }

    const handleGptSearchClick = async () => {
        dispatch(setLoading()); // ✅ Start loading

        const gptQuery = "Act as a movie Recommendation system and suggest some movies for the query" +
            searchText.current.value + 
            " . Only give me names of top 5 movies, comma separated. like the example result given ahead. Example Result: Don, Kick, Shadow,  8 Vasantalu, Koi Mil Gaya";

      const getResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery}],
        model: 'gpt-3.5-turbo',
      });

      const gptMovies = getResults?.choices[0]?.message?.content.split(",");

      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie)); 

      const tmdbResults =  await Promise.all(promiseArray);
      
      dispatch(addGptMoviesResult({movieNames: gptMovies, movieResults: tmdbResults}));
      dispatch(unsetLoading()); // ✅ Stop loading after dispatching results
    };
    
    return(
        <div className="pt-[35%] md:pt-[10%] flex justify-center w-full mb-[20%]">
            <form className="w-11/12 md:w-1/2 bg-black grid grid-cols-12 rounded-full p-1 md:p-2" onSubmit = {(e) => e.preventDefault()}>
                <input 
                ref={searchText}
                    type = "text" 
                    className="p-2 md:p-4 col-span-9 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600" 
                    placeholder={lang[langKey].searchPlaceholder}
                />
                <button className = "col-span-3 py-2 px-4 bg-red-600 text-white rounded-full transition-colors duration-200 hover:bg-red-700 font-bold" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar;
