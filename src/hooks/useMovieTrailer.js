import { useEffect, useState } from "react";
import { API_Options } from "../Utils/constants";
const useMovieTrailer = () => {
    
        const[trailerId, setTrailerId] = useState(null);
       const getMovieVideos = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/ 755898/videos", API_Options);
        const json = await data.json();
        const trailer = json.results[0];
        // console.log(trailer);
        // console.log(json);
        setTrailerId(trailer.key);
    }

    useEffect(() => {
        getMovieVideos();
    }, [])
    return trailerId;
}

export default useMovieTrailer;