import React from 'react';
import Lottie from 'lottie-react';
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
      <div className='w-[25rem]'>
          <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  )
}

export default Loading