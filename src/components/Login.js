import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import CheckValidData from "../Utils/Validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utils/firebase";
const Login = () =>{
    const[isSignForm, setIsSignInForm] = useState(true);
    const[errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);

    const handlebuttonClick = () => {
        //validate the credentials
        //console.log(email.current.value);
        //console.log(password.current.value);

       const message =  CheckValidData(email.current.value, password.current.value);
       setErrorMessage(message);
       if(message) return;

       if(!isSignForm){
        //sign up logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;  
            updateProfile(user, {
              displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
              navigate("/Browse")
            }).catch((error) => {
              setErrorMessage(error.message)
            });
            //console.log(user);
            navigate("/Browse")
             // ...
            })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage)
              // ..
        });
       }
       else{
        //sign In logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
          // Signed in 
         const user = userCredential.user;
         //console.log(user)
         navigate("/Browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
       }

    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignForm);
    }
    return(
      <div className = "fix w-full bg-auto">
        <Header/>
        <div>
    {/* The global background image is now handled by Body.js, so this div is removed from Login.js */}
    <div className = "fixed inset-0 -z-20">
        <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg"
        alt = "bg-img"
        className="w-full h-full object-cover"/>
    </div>

    <form onSubmit = {(e) => e.preventDefault()} className = "absolute my-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-11/12 md:w-3/12 lg:w-1/4 p-8 md:p-12 text-white rounded-lg bg-opacity-80 shadow-2xl h-fit z-10">
        <h1 className = "font-bold text-2xl md:text-3xl mb-4">{isSignForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignForm && (
            <input 
                type = "text" 
                placeholder = "Full Name" 
                className = "p-3 my-3 w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        )}
        <input 
            ref = {email} 
            type = "text" 
            placeholder = "Email or Phone Number" 
            className = "p-3 my-3 w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input 
            ref = {password} 
            type = "password" 
            placeholder = "Password" 
            className = "p-3 my-3 w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <p className = "text-red-700 font-bold text-sm md:text-base mt-2">{errorMessage}</p>
        <button 
            onClick = {handlebuttonClick} 
            className = "bg-red-700 w-full rounded-lg p-3 my-6 text-base md:text-lg font-bold hover:bg-red-800 transition-colors duration-200 shadow-md"
        >
            {isSignForm ? "Sign In" : "Sign Up"}
        </button>
        <p className = "pt-4 text-sm md:text-base text-gray-400">
            {isSignForm ? "New to Netflix? " : "Already a user? "}
            <span onClick={toggleSignInForm} className="font-bold text-white cursor-pointer hover:underline">
                {isSignForm ? "Sign Up Now" : "Sign In"}
            </span>
        </p>
    </form>  
</div>
</div>

    ) 
}

export default Login;