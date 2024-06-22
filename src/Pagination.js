import React, { useContext } from "react";
import BlogContext from "./contexts/BlogContext";
const Pagination = () => {
  // window.scrollTo({
  //     top: 400,
  //     behavior: 'smooth',
  //   });
  const { postPerPage, totalPost, paginate, currentPage, setCurrentPage } =
    useContext(BlogContext);
  const pageNumber = [];
  const nextPage = () => {
    const next = setCurrentPage(currentPage + 1);
    console.log("hello", next);
    console.log("paginate", paginate);
  };

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="absolute  z-30  cursor-pointer">
      <nav className="flex ">
        {pageNumber.map((number) => (
          <div className="inline-flex -space-x-px text-sm">
            <div
              onClick={() => paginate(number)}
              className="tap-transparent flex items-center  mr-1 rounded-md justify-center px-3 h-8 leading-tight bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {number}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
