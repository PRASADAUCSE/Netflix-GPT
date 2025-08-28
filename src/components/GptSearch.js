import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return(
        <div>
            {/* Background image covering the entire viewport responsively */}
            <div className="fixed inset-0 -z-10"> 
                <img 
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg"
                    alt="bg-img"
                    className="w-full h-full object-cover" // Ensure it covers the full div and maintains aspect ratio
                />
            </div>
            {/* Content for GPT search bar and suggestions */}
            <div className="pt-32 md:pt-0"> {/* Add top padding for mobile, remove on desktop if search bar handles it */}
                <GptSearchBar/>
                <GptMovieSuggestions/>
            </div>
        </div>
    )
}

export default GptSearch;
