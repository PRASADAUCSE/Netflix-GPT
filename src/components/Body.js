import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Browse from "./Browse"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";


const Body = () =>{
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    


    const appRouter = createBrowserRouter([
        {
             path: "/",
            element : <Login/>
        },
        {
            path: "/Header",
            element: <Header/>
        },
        {
            path: "/Browse",
            element: <Browse/>
        }
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const{uid, email, dispalyName}  = auth.currentUser;
            dispatch(addUser({uid, email: email, dispalyName: dispalyName}));
            // ...
        } else {
            // User is signed out
            // ...
            dispatch(removeUser());
        }
});
    }, [])
    
    return(
        <div>
            <RouterProvider router = {appRouter}/>
        </div>
    )
}

export default Body;