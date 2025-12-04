import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse"; // <-- IMPORTANT
import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Header from "./Header";
import Cart from "./Cart";

const AppLayout = () => {
  
 return(
  <div>
    <Header/> 
    <Outlet/>
  </div>
 )}
  const approuter = createBrowserRouter([
   
    {
      path: "/",
      element: <AppLayout/>,
      children:[
        {
          path:"/login",
          element:<Login/>
        },
{
      path: "/browse",  
      element: <Browse />,
    },
    {
      path: "/cart",  
      element: <Cart/>,
    },
      ]
    },
    
  ]);

const App = ()=>{
    return (
    <div className="bg-blue-950 min-h-screen">
      <RouterProvider router={approuter} />
    </div>
  );
}

export default App;
