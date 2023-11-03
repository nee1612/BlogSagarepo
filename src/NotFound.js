import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageNotFound from "./assets/404NotFound.json";
import Lottie from "lottie-react";
const NotFound = () => {
  const history = useNavigate();
  
    return ( 
       <div className="flex justify-center">
        {
          
        }
        <div className="flex justify-center items-center mt-[7rem]">
        <div className="w-[90%]" onClick={()=>history("/")}>
           <Lottie animationData={PageNotFound} loop={true} />
        </div>
        </div>
        {/* <Link to="/">Go to homepage....</Link> */}
       </div>
     );
}
 
export default NotFound;