import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { API_Options } from "../Utils/constants";
import { addTopRatedMovies } from "../Utils/moviesSlice";

const useTopRatedMovies = async() => {
    const dispatch = useDispatch();

    const getTopRatedMovies = async() => {
    const data = await fetch("https://api.themoviedb.org/3/movie/top_rated", API_Options);
    const json = await data.json();
    //yconsole.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  }
  useEffect(() => {
    getTopRatedMovies();
  }, []);
}

export default useTopRatedMovies;