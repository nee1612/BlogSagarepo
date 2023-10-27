import React from 'react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Lottie from 'react-lottie';
import loading from "./assets/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    // <div className='flex justify-center mt-44'>
    //     <ClimbingBoxLoader
    //      color= "#f1356d"
    //     size={20}
    //   />
    // </div>
    <div className='flex justify-center mt-44'>
<  Lottie options={defaultOptions} width={450}/>
    </div>
  )
}

export default Loading