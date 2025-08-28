import React, { useEffect, useState } from "react";
import { IMG_CDN, API_Options } from "../Utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";

const TrailerPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(null);

  // Aggregate all movies from Redux, INCLUDING GPT suggested movies
  const allMovies = [
    ...(useSelector((store) => store.movies.nowPlayingMovies) || []),
    ...(useSelector((store) => store.movies.popularMovies) || []),
    ...(useSelector((store) => store.movies.topRatedMovies) || []),
    ...(useSelector((store) => store.movies.upcomingMovies) || []),
    ...(useSelector((store) => store.gpt.movieResults)?.flat() || []), // Flatten the array of arrays from GPT results
  ];

  // Find the movie from the aggregated list
  const movieFromRedux = allMovies.find((m) => m.id === parseInt(movieId));

  useEffect(() => {
    const fetchDetails = async () => {
      if (movieFromRedux) {
        setMovieDetails(movieFromRedux);
        setRating(movieFromRedux.vote_average);
      }

      try {
        const [creditsRes, detailsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, API_Options),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}`, API_Options),
        ]);
        
        if (!creditsRes.ok) throw new Error(`Credits API failed: ${creditsRes.status}`);
        if (!detailsRes.ok) throw new Error(`Details API failed: ${detailsRes.status}`);

        const creditsData = await creditsRes.json();
        const detailsData = await detailsRes.json();

        setCast(creditsData.cast?.slice(0, 8) || []);
        setGenres(detailsData.genres || []);
        
        setMovieDetails(detailsData); 
        setRating(detailsData.vote_average);

      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };

    if (movieId) {
      fetchDetails();
    }
  }, [movieId, movieFromRedux]);

  const movieToDisplay = movieDetails || movieFromRedux;

  if (!movieToDisplay) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl mb-4">Loading movie details or movie not found...</p>
        <button
          onClick={() => navigate("/browse")}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded transition duration-200"
        >
          ← Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-black text-white min-h-screen p-4 sm:p-6 pb-20 font-inter">
      <button
        onClick={() => navigate("/browse")}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded shadow mt-2 md:mt-4 transition duration-200 flex items-center gap-2"
      >
        ← Back to Browse
      </button>

      {/* Main Content Area - Details & Poster (Now at the top) */}
      <div className="mt-6 md:mt-10 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto items-start">
        {/* Details & Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-2xl text-red-500">
            {movieToDisplay.title || movieToDisplay.original_title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            {rating != null && (
              <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-base flex items-center gap-1 shadow-md">
                ⭐ {rating.toFixed(1)} / 10
              </span>
            )}
            {genres.map((g) => (
              <span key={g.id} className="bg-gray-700 text-sm px-3 py-1 rounded-full shadow-sm">
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">{movieToDisplay.overview}</p>

          {cast.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Top Cast</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {cast.map((actor) => (
                  <li key={actor.cast_id} className="flex flex-col items-center text-center space-y-2 bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-200">
                    {actor.profile_path ? (
                      <img
                        src={IMG_CDN + actor.profile_path}
                        alt={actor.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-red-600 shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-sm font-semibold border-2 border-gray-600">
                        N/A
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-white text-md">{actor.name}</p>
                      <p className="text-gray-400 text-sm line-clamp-2">{actor.character}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Poster */}
        <img
          src={IMG_CDN + movieToDisplay.poster_path}
          alt={movieToDisplay.title || movieToDisplay.original_title}
          className="w-full max-w-xs md:max-w-sm rounded-lg shadow-2xl hover:shadow-red-500/80 transition-shadow duration-300 object-cover mx-auto md:sticky md:top-24 h-fit"
        />
      </div>

      {/* Trailer Video - Now at the bottom */}
      <div className="w-full max-w-7xl mx-auto mt-12 rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16 / 9' }}>
        <VideoBackground movieId={movieToDisplay.id} isMuted={false} />
      </div>
    </div>
  );
};

export default TrailerPage;
