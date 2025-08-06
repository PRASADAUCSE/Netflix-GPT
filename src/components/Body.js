import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";

const Body = () =>{
    const appRouter = createBrowserRouter([
        {
             path: "/",
            element : <Login/>
        },
        {
            path: "/Header",
            element: <Header/>
        }
    ])
    
    return(
        <div>
            <RouterProvider router = {appRouter}/>
        </div>
    )
}

export default Body;