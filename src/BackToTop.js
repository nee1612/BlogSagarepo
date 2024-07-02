import React from "react";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Top from "./assets/topButtonn.json";

const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTop && (
        <div
          className=" z-40  w-[50px]  h-[50px]  fixed bottom-[50px] right-[30px]    "
          onClick={scrollUp}
        >
          <div className="w-[100%] absolute bg-opacity-90 backdrop-blur-sm rounded-full bg-slate-800  z-50 ">
            <Lottie animationData={Top} loop={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
