import { IMG_CDN } from "../Utils/constants";

const MovieCard = ({posterPath}) => {
    if(!posterPath) return null;
    return(
            <div className="w-36 md:w-48 lg:w-56 xl:w-60 rounded-lg pr-4 cursor-pointer"> // Responsive width and padding
            <img alt = "movie-card" src = {IMG_CDN + posterPath} className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out" />
            
        </div>
    )  
}

export default MovieCard;