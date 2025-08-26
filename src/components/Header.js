
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
            //successful signout 
            Navigate("/")
        }).catch((error) => {
            Navigate("/error")
        })
        
    }

    const handleLanguageChange = (e) => {
      dispatch(changeLanguage(e.target.value));
    }

    const handleGptSearchClick = () => {
      //Toggle gpt search
      console.log("clicked");
      dispatch(toggleGptSearchView());
      console.log("clicked");
      
    }
  return (
    <header className="flex justify-between items-center absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-50">
      <img
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix logo"
        className="w-32 md:w-44"
      />
      <div className="flex items-center gap-4">
        { showGptSearch &&(
        <select onChange = {handleLanguageChange} className="p-2 m-2 bg-gray-600 rounded-lg">
          {SUPPORTED_LANGUAGES.map(lang => 
          <option key = {lang.identifier}  value = {lang.identifier}>{lang.name}</option>)}
        </select>
      )}
        <button 
          onClick = {handleGptSearchClick}
          className = "py-2 px-3 mx-2 bg-purple-900 text-white rounded-lg"
        >
              {showGptSearch? "Home Page" : "GPT Search"}
        </button>
        <img
          alt="User profile icon"
          src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png"
          className="w-auto h-8 rounded-full"
        />
        <button
          className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
          //aria-label="Sign out of your account"
          onClick = {handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Header;