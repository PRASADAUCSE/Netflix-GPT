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
        console.log(email.current.value);
        console.log(password.current.value);

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
            console.log(user);
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
         console.log(user)
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
      <div>
        <Header/>
        <div className = "absolute">
        <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg"
        alt = "bg-img"/>
        </div>

        <form onSubmit = {(e) => e.preventDefault()} className = "absolute my-32 mx-auto bg-black w-3/12 right-0 left-0 p-12 text-white rounded-lg bg-opacity-80">
         <h1 className = "font-bold text-3xl mx-2 mb-3">{isSignForm ? "Sign In" : "Sign up"}</h1>
         {!isSignForm && (<input type = "text" placeholder = "Full Name" className = "p-2 m-2 w-full rounded-lg bg-gray-700"/>)}
            <input ref = {email} type = "text" placeholder = "Email or Phone Number" className = "p-2 m-2 w-full rounded-lg bg-gray-700"/>
            <input ref = {password} type = "password" placeholder = "Password" className = "p-2 m-2 my-1 w-full rounded-lg bg-gray-700"/>
            <p className = "text-red-700">{errorMessage}</p>
            <button onClick = {handlebuttonClick} className = "bg-red-700 w-full rounded-lg p-2 mt-5 mx-2">{isSignForm ? "Sign In" : "Sign up"}</button>
            <h1 className = "font-bold pt-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignForm ? "New to Netflix? Signup" : "Already a user SignIn"}
                
            </h1>
        </form>  
      </div>
    ) 
}

export default Login;