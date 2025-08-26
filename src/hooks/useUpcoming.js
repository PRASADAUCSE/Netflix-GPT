import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { API_Options } from "../Utils/constants";
import { addUpcomingMovies } from "../Utils/moviesSlice";

const useUpcomingMovies = async() => {
    const dispatch = useDispatch();

    const getUpcomingMovies = async() => {
    const data = await fetch("https://api.themoviedb.org/3/movie/upcoming", API_Options);
    const json = await data.json();
    //yconsole.log(json.results);
    dispatch(addUpcomingMovies(json.results));
  }
  useEffect(() => {
    getUpcomingMovies();
  }, []);
}

export default useUpcomingMovies;