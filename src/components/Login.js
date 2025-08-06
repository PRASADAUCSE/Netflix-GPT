import Header from "./Header";
import { useState } from "react";
const Login = () =>{
    const[isSignForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignForm);
    }
    return(
      <div>
        <Header/>
        <div className = "absolute">
        <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg"
        alt = "bg-img"/>
        </div>

        <form className = "absolute my-32 mx-auto bg-black w-3/12 right-0 left-0 p-12 text-white rounded-lg bg-opacity-80">
         <h1 className = "font-bold text-3xl mx-2 mb-3">{isSignForm ? "Sign In" : "Sign up"}</h1>
         {!isSignForm && (<input type = "text" placeholder = "Full Name" className = "p-2 m-2 w-full rounded-lg bg-gray-700"/>)}
            <input type = "text" placeholder = "Email or Phone Number" className = "p-2 m-2 w-full rounded-lg bg-gray-700"/>
            <input type = "password" placeholder = "Password" className = "p-2 m-2 my-1 w-full rounded-lg bg-gray-700"/>
            <button className = "bg-red-700 w-full rounded-lg p-2 mt-5 mx-2">{isSignForm ? "Sign In" : "Sign up"}</button>
            <h1 className = "font-bold pt-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignForm ? "New to Netflix? Signup" : "Already a user SignIn"}
                
            </h1>
        </form>  
      </div>
    ) 
}

export default Login;