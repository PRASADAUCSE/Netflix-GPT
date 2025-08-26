const VideoTitle = ({title, overview}) => {
    return(
        <div className="w-screen aspect-video -pt-[5%] absolute text-white bg-gradient-to-r from-black via-black/40 to-transparent p-4 md:px-16 z-20 top-0 flex flex-col justify-center">
            <h1 className="text-2xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight"> {title}</h1>
            <p className="hidden md:block text-lg w-1/2 lg:w-1/3 mb-6 text-gray-200 line-clamp-3"> {overview}</p>
            <div className="flex gap-4 mt-2 md:mt-0">
                <button className="bg-white text-black py-2 px-6 md:py-3 md:px-10 rounded-md text-base md:text-lg font-bold hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2">▶️ Play</button>
                <button className="bg-gray-600 text-white py-2 px-6 md:py-3 md:px-10 rounded-md text-base md:text-lg font-bold bg-opacity-60 hover:bg-opacity-50 transition-all duration-200 flex items-center gap-2">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;
