import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../Utils/constants";
import { changeLanguage } from "../Utils/configSlice";
import { useSelector } from "react-redux";

const Header = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            Navigate("/")
        }).catch((error) => {
            Navigate("/error")
        })
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    }

    return (
        
        <header className="fixed w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row items-center justify-between">
            <img
                src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="Netflix logo"
                className="w-28 md:w-44 mb-2 md:mb-0"
            />
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-4">
                {showGptSearch && (
                    <select onChange={handleLanguageChange} className="p-1 md:p-2 bg-gray-600 text-white rounded-lg text-sm md:text-base">
                        {SUPPORTED_LANGUAGES.map(lang =>
                            <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                    </select>
                )}
                <button
                    onClick={handleGptSearchClick}
                    className="py-1 px-2 md:py-2 md:px-3 bg-purple-900 text-white rounded-lg text-sm md:text-base hover:bg-purple-800 transition-colors duration-200"
                >
                    {showGptSearch ? "Home Page" : "GPT Search"}
                </button>
                <img
                    alt="User profile icon"
                    src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png"
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full"
                />
                <button
                    className="text-white bg-red-600 px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-red-700 text-sm md:text-base transition-colors duration-200"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
        </header>
    );
}

export default Header;
