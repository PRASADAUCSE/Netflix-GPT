import { useEffect, useState } from "react";
import { API_Options } from "../Utils/constants";
import { useDispatch } from "react-redux";
const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
       const[trailerId, setTrailerId] = useState(null);
       const getMovieVideos = async() => {
        if(!movieId) return ;

        const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos", API_Options);
        const json = await data.json();
        console.log(json);
        const trailer =
        json.results.find((video) => video.type === "Trailer") ||
        json.results.find((video) => video.type === "Teaser") ||
        json.results[0];
        
        //console.log(trailer);
        
        setTrailerId(trailer.key);

        console.log("trailer id: " + trailer);
    }


    useEffect(() => {
        getMovieVideos();
    }, [])
    return trailerId;
}

export default useMovieTrailer;