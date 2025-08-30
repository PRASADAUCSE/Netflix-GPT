import { useState } from "react";
import { IMG_CDN } from "../Utils/constants";
import VideoBackground from "./VideoBackground";
import { useNavigate } from "react-router-dom";

 const MovieCardWithTrailer = ({ movie }) => {
    const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/trailer/${movie.id}`);
  };
  const posterPath=movie.poster_path
  if(!posterPath) return null;

  return (
    <div className="cursor-pointer w-36 md:w-48 lg:w-56 xl:w-60 pr-4 flex-shrink-0 " // Added responsive width and padding to the container
      onClick={handleClick}>
        <img alt = "movie-card" src = {IMG_CDN + posterPath} className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out" // Applied the styling here
/>
      
    </div>
    //<h1>This is redirected page</h1>
  );
};

export default MovieCardWithTrailer;
