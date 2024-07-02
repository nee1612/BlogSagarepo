import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../contexts/BlogContext";
import Loader from "../Loading.js";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
function Dashboard() {
  const { userData, blgData, isLoading } = useContext(BlogContext);
  console.log(userData, "userdata");
  const [blogLength, setBlogLength] = useState("");

  const [userBlogs, setUserBlogs] = useState([]);
  const fetchUserBlogs = () => {
    const userBlog = blgData.filter((blog) => blog.userId === userData.uid);
    setBlogLength(userBlog.length);
    setUserBlogs(userBlog);
    console.log(userBlogs);
  };
  useEffect(() => {
    fetchUserBlogs();
  }, []);
  const navigate = useNavigate();
  const handleNavigation = (id) => {
    navigate("/dashboard/detail", {
      state: { blog_id: id },
    });
  };

  return (
    <div className="mt-16 ">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <section className="flex items-center justify-center sm:justify-start flex-wrap sm:flex-nowrap  gap-5 mx-14 pt-7 ">
            <div>
              <img
                src={userData.photoURL}
                className="
                w-[ 20vw] h-[20vh] rounded-full
                "
                alt=""
              />
            </div>
            <div>
              <span className="flex items-center gap-1 sm:flex-nowrap flex-wrap">
                <p>Name:</p>
                <p>{userData.displayName}</p>
                {/* {userData.displayName} */}
              </span>
              <span className="flex items-center gap-1 sm:flex-nowrap flex-wrap">
                <p>Email Id:</p>
                {userData.email}
              </span>
              <span className="flex items-center gap-1 sm:flex-nowrap flex-wrap">
                <p>Created At:</p>
                {moment(userData.metadata?.creationTime).format("LL")}
              </span>
              <span className="flex items-center gap-1 sm:flex-nowrap flex-wrap">
                <p>Total Blogs:</p>
                {blogLength}
              </span>
            </div>
          </section>
          {/* My blogs */}
          <section className="my-10">
            <p className="ml-8 sm:ml-14 text-2xl font-semibold mb-5 ">
              My Blogs
            </p>
            <div className=" flex flex-wrap justify-center  gap-10 mx-10   z-10  ">
              {userBlogs.map((blog) => (
                <div className="flex relative   ">
                  <div class=" p-6 pb-7 min-w-[2rem]  mmobile:min-w-[23rem] lmobile:min-w-[28rem] sm:min-w-[38rem] md:min-w-[45rem]  lg:min-w-[35rem]  max-w-[40rem] w-[270px] smobile:w-[310px] mmobile:w-[300px] rounded-md shadow-md  hover:shadow-xl hover:transition-all bg-gray-800 bg-opacity-90 backdrop-blur-sm   ">
                    <div className="pb-4 flex items-center gap-2 ">
                      {blog.Photo ? (
                        <img src={blog.Photo} className="rounded-full w-8" />
                      ) : (
                        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white text-black text-lg font-bold">
                          {blog.User[0].toUpperCase()}
                        </div>
                      )}
                      <div className="flex-wrap mmobile:flex gap-3  items-center">
                        <p className="text-white cursor-default">{blog.User}</p>
                        <p className="text-white text-xs">
                          {" "}
                          {moment(blog.createdAt.toDate()).calendar()}
                        </p>
                        {/* <p className="text-white text-sm  ">
                          Posted on: {blog.createdAt.toDate().toDateString()}
                        </p> */}
                      </div>
                    </div>
                    <h5
                      class="cursor-default mb-2 text-2xl font-bold tracking-tight text-white 
                            
                              "
                      contentEditable
                      dangerouslySetInnerHTML={{
                        __html: blog.Title,
                      }}
                    />
                    {/* <p className="text-white text-xs py-1 ">Posted on: {toDate(blog.createdAt)}</p> */}

                    {/* <p className="text-white text-xs py-1 flex">Posted on: <p className="text-white bg-red-700">{moment(blog.createdAt.toDate()).add('days').calendar()}</p> </p> */}

                    <p
                      class="cursor-default mb-[2.5rem] font-normal text-gray-400   to-transparent"
                      contentEditable
                      dangerouslySetInnerHTML={{
                        __html: blog.Body.slice(0, 100) + "......",
                      }}
                    />
                    <div
                      onClick={() => handleNavigation(blog.id)}
                      className="  cursor-pointer my-3 absolute bottom-[5px] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-800 rounded-sm hover:bg-emerald-700 "
                    >
                      {/* <Link className="  " to={`/detail/${blog.id}`}> */}
                      Read more
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
