const VideoTitle = ({title, overview}) => {
    return(
        // Adjusted padding top for better mobile visibility: pt-[15%] on mobile, pt-[10%] on medium screens
        // This ensures the title starts higher on small screens.
        <div className="absolute inset-0 text-white bg-gradient-to-r from-black/80 via-black/40 to-transparent p-4 md:px-16 z-20 flex flex-col justify-center pt-[15%] md:pt-[10%]">
            <h1 className="text-3xl md:text-6xl font-extrabold mb-2 md:mb-4 drop-shadow-lg leading-tight"> {title}</h1>
            {/* REMOVED 'hidden md:block' to make overview visible on mobile */}
            {/* Added responsive width, text size, and line-clamp for mobile */}
            <p className="text-sm md:text-lg w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-6 text-gray-200 line-clamp-3"> {overview}</p>
            <div className="flex gap-2 md:gap-4 mt-2 md:mt-0">
                <button className="bg-white text-black py-2 px-4 md:py-3 md:px-10 rounded-md text-sm md:text-lg font-bold hover:bg-opacity-90 transition-all duration-200 flex items-center gap-1 md:gap-2 cursor-pointer">▶️ Play</button>
                <button className="bg-gray-600 text-white py-2 px-4 md:py-3 md:px-10 rounded-md text-sm md:text-lg font-bold bg-opacity-60 hover:bg-opacity-50 transition-all duration-200 flex items-center gap-1 md:gap-2 cursor-pointer">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;
