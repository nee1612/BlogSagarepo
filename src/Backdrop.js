import React from "react";

const backdrop = ({click,isOpen}) => {
    return ( 
        // <div className="w-full h-screen absolute top-0 right-0 bg-gray-800 z-50 hidden block">
        <div className={isOpen?"w-[calc(100%-240px)] bg-slate-400 opacity-70  h-screen fixed top-0 left-0  z-50 block":"hidden"} onClick={ click}>

        </div>
     );
}
 
export default backdrop;