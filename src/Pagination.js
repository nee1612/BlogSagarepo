import React, { useContext } from "react";
import BlogContext from "./contexts/BlogContext";
const Pagination = () => {
    const {postPerPage,totalPost,paginate,currentPage,setCurrentPage} =useContext(BlogContext);
    const pageNumber=[];
    const nextPage=()=>{
        const next=setCurrentPage(currentPage+1);
        console.log("hello",next);
        console.log("paginate",paginate);
    }

    for(let i=1;i<=Math.ceil(totalPost/postPerPage);i++){
        pageNumber.push(i);
    }
    return ( 
        <div className="absolute  z-30  cursor-pointer">
            <nav className="flex ">
                {
                    pageNumber.map(number=>(
                    <div  className="inline-flex -space-x-px text-sm">
                
                        <div onClick={()=>paginate(number)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{number}</div>
                        </div>
                    
                    ))
                }
            </nav>
        </div>
     );
}
 
export default Pagination;