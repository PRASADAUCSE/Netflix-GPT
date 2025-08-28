import useMovieTrailer from "../hooks/useMovieTrailer";
import useTrailerById from "../hooks/useTrailerById";

const VideoBackground = ({movieId, isMuted = true}) => {
    
    const movieTrailerId = useMovieTrailer(movieId);
   // const trailerById = 
    const trailerId = useTrailerById(movieId);
    const muteParam = isMuted ? '1' : '0';
    
    return (
        <div className="w-screen aspect-screen"> 
                <iframe 
                    className="w-full aspect-video" 
                    src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=${muteParam}&controls=${isMuted ? '0' : '1'}&loop=1&playlist=${trailerId}&modestbranding=1`}
                    title="YouTube video player" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    // referrerpolicy="strict-origin-when-cross-origin" is often not needed within an iframe element itself
                >
                </iframe>
        </div>
    )
}
export default VideoBackground;
