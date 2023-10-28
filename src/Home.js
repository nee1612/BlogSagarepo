import React, { useContext, useState } from "react";
import BlogContext from "./contexts/BlogContext";
import Lottie from "react-lottie";
import Loading from "./Loading";
import { BiSolidQuoteRight } from "react-icons/bi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import header1 from "./assets/header1";
import background1 from "./assets/background1.json";
import hero from "./assets/hero.json";
import { Typewriter } from "react-simple-typewriter";
import Pagination from "./Pagination";
import Logo from "./assets/logo_transparent_dark.png";
import BackToTop from "./BackToTop";
import moment from 'moment';
import search_icon from "./assets/search.json";
import { motion} from "framer-motion"; 

const Test = () => {
  const { isLoading } = useContext(BlogContext);
  const { currentPosts } = useContext(BlogContext);
  const [search,setSearch] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: header1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: background1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: hero,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const search_lottie = {
    loop: true,
    autoplay: true,
    animationData: search_icon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="">
      {!isLoading && (
        <div>
          <div>
            <div className="">
              <div>
                <div className=" relative flex  items-center flex-wrap align-middle justify-center sm:flex-nowrap mt-16 lmobile:mt-14 mx-auto lmobile:w-[100%] md:w-[45rem]  lg:w-[60rem] xl:w-[70rem] lg:max-w-6xl ">
                  <div className="  pl-2 mmobile:pl-4 lmobile:pl-3 ">
                    <div
                      className=" cursor-default top-[-0.5rem] smobile:top-[-1.5rem] mmobile:top-[-1  rem] h-[28%] smobile:h-[33%] mmobile:h-[35%] lmobile:h-[37%] sm:h-[70%] md:h-[90%] lg:h-[78%]    sm:top-[1rem] md:top-[1rem] lg:top-[3rem] w-[5.5rem] 
                    smobile:w-[5.5rem] mmobile:w-[7rem] sm:w-[7rem] md:w-[8.5rem] lg:w-[11.5rem]   absolute"
                    >
                      <Lottie options={defaultOptions3} />
                    </div>
                    <h1 className=" cursor-default mt-5 lmobile:mt-10  lmobile:my-5 md:my-8  font-bold  text-black text-2xl mmobile:text-3xl md:text-4xl lg:text-5xl font-[Merriweather]">
                      Express Yourself
                    </h1>
                    <p className="cursor-default lmobile:w-[100%] md:w-[80%] lg:w-[90%]  smobile:mt-3 lmobile:font-medium  sm:font-semibold lmobile:text-sm sm:text-base lg:text-xl">
                      Your Voice, Your Blog. Start writing and sharing your
                      unique stories with the world. It's simple, it's easy—get
                      started now!
                    </p>
                  </div>
                  <div className=" mmobile:pt-3">
                    <div className="cursor-default smobile:mt-2 w-[13rem] smobile:w-[18rem] mmobile:w-[20rem] lmobile:w-[16rem] md:w-[18rem] lg:w-[25rem] ">
                      <Lottie options={defaultOptions} />
                    </div>
                  </div>
                </div>
                <motion.div className="w-[9rem] mt-6 lmobile:mt-0 "   whileHover={{ scale: 1.1 }} >
                <div className=" w-[17.5rem] smobile:w-[18rem]  my-3  py-2 rounded-r-full bg-blue-700 flex items-center gap-4 translate-x-[calc(-14.5rem+1.9vw)] hover:translate-x-[0]">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="  ml-3 rounded-sm border border-gray-300  px-6 py-[4px]  text-sm placeholder:px-0 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div >
                  <Lottie options={search_lottie} width={40} />
                  </div>
                </div>
                </motion.div> 
                <div className="pt-5 mmobile:pt-4 ">
                  <div className=" flex justify-center  ">
                    <div className="cursor-default absolute hidden lg:block  z-0 md:h-[50rem] lg:h-[55rem]  ">
                      <Lottie options={defaultOptions2} />
                    </div>
                    <div className=" flex flex-wrap justify-center  gap-10 mx-10   z-10  sm:mt-10 md:mt-16 lg:mt-10 ">
                      {currentPosts
                        .filter((sear) => {
                          return (
                            search.toLowerCase() === ""
                              ? sear
                              :  sear.Title.toLowerCase().includes(search) ||
                            sear.Body.toLowerCase().includes(search) ||
                            sear.User.toLowerCase().includes(search)
                          );
                        })
                        .map((blog) => (
                          <div className="flex relative   ">
                            <div class=" p-6 pb-7 min-w-[2rem]  mmobile:min-w-[23rem] lmobile:min-w-[28rem] sm:min-w-[38rem] md:min-w-[45rem]  lg:min-w-[35rem]  max-w-[40rem] w-[270px] smobile:w-[310px] mmobile:w-[300px] rounded-md shadow-md  hover:shadow-xl hover:transition-all bg-gray-800 bg-opacity-90 backdrop-blur-sm   ">
                              <div className="pb-4 flex items-center gap-2 ">
                                {blog.Photo ? (
                                  <img
                                    src={blog.Photo}
                                    className="rounded-full w-8"
                                  />
                                ) : (
                                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white text-black text-lg font-bold">
                                    {blog.User[0].toUpperCase()}
                                  </div>
                                )}
                                <div className="flex-wrap mmobile:flex gap-3  items-center">
                                  <p className="text-white cursor-default">
                                    {blog.User}
                                  </p>
                                  <p className="text-white text-xs">
                                    {" "}
                                    {moment(
                                      blog.createdAt.toDate()
                                    ).calendar()}
                                  </p>
                                </div>
                              </div>
                              <h5 class="cursor-default mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                                {blog.Title}
                              </h5>
                              {/* <p className="text-white text-xs py-1 ">Posted on: {toDate(blog.createdAt)}</p> */}
                              {/* <p className="text-white text-xs py-1 ">Posted on: {blog.createdAt.toDate().toDateString()}</p> */}
                              {/* <p className="text-white text-xs py-1 flex">Posted on: <p className="text-white bg-red-700">{moment(blog.createdAt.toDate()).add('days').calendar()}</p> </p> */}

                              <p class="cursor-default mb-[2.5rem] font-normal text-gray-700 dark:text-gray-400   to-transparent">
                                {blog.Body.slice(0, 100)}
                              </p>
                                     <div className="  cursor-pointer my-3 absolute bottom-[5px] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-800 rounded-sm hover:bg-emerald-700 ">
                                    <Link
                                      className="  "
                                      to={`/detail/${blog.id}`}
                                      >
                                      Read more
                                    </Link>
                                     </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Pagination /> */}
            <div>
              <div className="flex justify-center mt-[1.5rem] ">
                <Pagination />
              </div>
            </div>
            {/* Testimonial */}
          </div>
          <div className="mx-4 z-50  ">
            <div className="relative mt-[7rem] flex justify-center ">
              <p className="font-semibold text-4xl   ">
                <Typewriter
                  words={["Testimonials"]}
                  loop
                  cursor
                  cursorStyle="✍"
                  typeSpeed={120}
                  deleteSpeed={70}
                  delaySpeed={1000}
                />
              </p>
            </div>
            <div className=" mb-10">
              <div className="flex flex-wrap justify-center gap-5 mx-3  mt-8 cursor-default">
                <div className="bg-green-800 min-w-[19rem] mmobile:min-w-[20rem] max-w-[36rem] w-full  px-5 text-justify py-5 rounded-md flex items-center shadow-lg">
                  <p className=" font-medium text-base text-white font-mono leading-7 pb-3">
                    <div className="pb-3 text-xl text-white">
                      <BiSolidQuoteRight style={{ fill: "white" }} />
                    </div>
                    "Your blog has been a constant source of inspiration and
                    knowledge for me. I've learned so much from your articles,
                    and they've helped me in both my personal and professional
                    life. Keep up the great work!"
                  </p>
                </div>
                <div className="bg-green-800 min-w-[19rem] mmobile:min-w-[20rem] max-w-[36rem] w-full px-5 text-justify py-5 rounded-md  flex items-center shadow-lg">
                  <p className="  font-medium text-base text-white font-mono leading-7 pb-3">
                    <div className="pb-3 text-xl text-white">
                      <BiSolidQuoteRight style={{ fill: "white" }} />
                    </div>
                    "I've been a dedicated reader of your blog for years, and it
                    just keeps getting better. The quality of the content and
                    the depth of your knowledge is truly remarkable. I'm looking
                    forward to more great articles in the future."
                  </p>
                </div>
                <div className="bg-green-800  min-w-[20rem] max-w-[36rem] w-full  px-5 text-justify py-5 rounded-md hidden sm:flex items-center shadow-lg">
                  <p className="  font-medium text-base text-white font-mono leading-7 pb-3  ">
                    <div className="pb-3 text-xl text-white">
                      <BiSolidQuoteRight style={{ fill: "white" }} />
                    </div>
                    "Your blog has not only educated me but also engaged me. The
                    discussions and interactions in the comments section have
                    broadened my perspective. It's more than just a blog; it's a
                    community of like-minded individuals."
                  </p>
                </div>
                <div className=" hidden sm:flex bg-green-800  min-w-[20rem] max-w-[36rem] w-full  px-5 text-justify py-5 rounded-md   items-center shadow-lg ">
                  <p className=" font-medium text-base text-white font-mono leading-7 pb-3">
                    <div className="pb-3 text-xl text-white">
                      <BiSolidQuoteRight style={{ fill: "white" }} />
                    </div>
                    "As a fellow blogger in the Blog Saga, I have immense
                    respect for the work you do. Your blog is an excellent
                    resource for those seeking expertise in this field, and I
                    often refer my own readers to your insightful content."
                  </p>
                </div>
              </div>
            </div>
            <footer class="w-full ">
              <div class="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
                <div class="w-full px-4 md:w-1/2 lg:px-0">
                  <h1 class="max-w-sm text-3xl font-bold cursor-default">
                    Subscribe to our Blog Post
                  </h1>
                  <form
                    action=""
                    class="mt-4 inline-flex w-full items-center md:w-3/4"
                  >
                    <input
                      class="flex h-10 w-full rounded-md border border-black/20 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                    />
                    <button
                      type="submit"
                      class="ml-4 rounded-full   text-sm  shadow-sm  "
                    >
                      <BsFillArrowRightCircleFill size={35} />
                    </button>
                  </form>
                  <div class="my-4 ml-2 lg:mb-0">
                    <Link to="/about">
                      <p className="font-bold   space-y-4 text-[14px]  text-gray-500 cursor-pointer">
                        About us
                      </p>
                    </Link>
                  </div>
                </div>
                <div class="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3 "></div>
              </div>
              <hr class="my-4" />
              <div class="mx-auto max-w-6xl items-center justify-between px-4  md:flex lg:px-0 relative">
                <div class=" flex-wrap lmobile:flex  items-center justify-center lmobile:justify-between   w-full">
                  <div className="flex lmobile:block justify-center">
                    <img className="w-[9rem] lmobile:pt-3  " src={Logo} />
                  </div>
                  <p class="text-sm font-semibold text-gray-500 flex justify-center pb-5 lmobile:pb-0 lmobile:block ">
                    © 2023 Blog Saga. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
          <BackToTop />
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default Test;
