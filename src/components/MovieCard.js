import { IMG_CDN } from "../Utils/constants";

const MovieCard = ({posterPath}) => {
    return(
        <div className = "w-60 rounded-lg">
            <img alt = "movie-card" src = {IMG_CDN + posterPath}/>
        </div>
    )  
}

export default MovieCard;