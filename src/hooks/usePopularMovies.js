import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { API_Options } from "../Utils/constants";
import { addPopularMovies } from "../Utils/moviesSlice";

const usePopularMovies = async() => {
  
    const dispatch = useDispatch();

    const getPopularMovies = async() => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular", API_Options);
    const json = await data.json();
    //yconsole.log(json.results);
    dispatch(addPopularMovies(json.results));
  }
  useEffect(() => {
    getPopularMovies();
  }, []);
}

export default usePopularMovies;