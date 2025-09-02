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
        const json = await data.json();

        return json.results;
    }

    const handleGptSearchClick = async () => {
        //Make an api call to GPT API and get Movie Results

        const gptQuery = "Act as a movie Recommendation system and suggest some movies for the query" +
            searchText.current.value + 
            " . Only give me names of top 5 movies, comma separated. like the example result given ahead. Example Result: Don, Kick, Shadow,  8 Vasantalu, Koi Mil Gaya";

      const getResults = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Updated to OpenAI's model name
        messages: [{ role: 'user', content: gptQuery}],
      });

      const gptMovies = getResults?.choices[0]?.message?.content.split(",");

      //For each movies i will search in TMDB
      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie)); 

      const tmdbResults =  await Promise.all(promiseArray);
      
      dispatch(addGptMoviesResult({movieNames: gptMovies, movieResults: tmdbResults}));
    };

    
    return(
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit = {(e) => e.preventDefault()}>
                <input 
                ref={searchText}
                    type = "text" 
                    className="p-4 m-4 col-span-9 rounded-lg" 
                    placeholder={lang[langKey].searchPlaceholder}
                />
                <button className = "col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg m-2" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar;
