import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageNotFound from "./assets/404NotFound.json";
import Lottie from "react-lottie";
const NotFound = () => {
  const history = useNavigate();
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: PageNotFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
    return ( 
       <div className="flex justify-center">
        {
          
        }
        <div className="w-[50%]  " onClick={()=>history("/")}>
           <Lottie options={defaultOptions} />
        </div>
        {/* <Link to="/">Go to homepage....</Link> */}
       </div>
     );
}
 
export default NotFound;