import { useEffect, useState } from "react";
import { API_Options } from "../Utils/constants";

const useTrailerById = (movieId) => {
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_Options
        );
        const data = await response.json();

        // First try to find a Trailer, then a Teaser, else fallback to first video
        const trailer =
          data.results.find((video) => video.type === "Trailer") ||
          data.results.find((video) => video.type === "Teaser") ||
          data.results[0];

        if (trailer) {
          setTrailerId(trailer.key);
          console.log("trailer id: " + trailer.key);
        } else {
          console.warn("No trailer found for this movie");
        }
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    };

    getMovieVideos();
  }, [movieId]); // ✅ include movieId as dependency

  return trailerId;
};

export default useTrailerById;
