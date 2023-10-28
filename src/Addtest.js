import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { blogData, auth, getCurrentUser, userData } from "./config/firebase";
import { useNavigate } from "react-router-dom";
import BlogContext from "./contexts/BlogContext";
import Lottie from "react-lottie";
import blog from "./assets/blog.json";
import Loading from "./Loading";
import { Typewriter } from "react-simple-typewriter";
import Cookies from "universal-cookie";
import { BsFillArrowRightCircleFill} from "react-icons/bs";
import Logo from './assets/logo_transparent.png';
import { Link } from "react-router-dom";
import Login from "./Login";
const cookies = new Cookies();

const Addtest = () => {
  const history = useNavigate();
  const { isLoading } = useContext(BlogContext);
  const [user, setUser] = useState(null);
  const [dataUser,setDataUser] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const blogRef = collection(blogData, "BlogData");
  const { updateVariableFunc, pleaseLogin } = useContext(BlogContext);
  const authRef = collection(userData, "userCred");
  const currentUser = getCurrentUser();
  const [authState, setAuthState] = useState(cookies.get("auth-token"));
  const [isValid,setIsValid] = useState("");
  const refToken = cookies.get("auth-token");
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (refToken === undefined) {
      pleaseLogin();
    } else {
      setUser(currentUser);
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setDataUser(currentUser.displayName);
    if (title === "" || body === "") {
      setIsValid("*Please fill all the fields");
    } else {
      setIsValid("");
      console.log("second");
      try {
        await addDoc(blogRef, {
          Body: body,
          Title: title,
          User: user.displayName,
          Photo: user.photoURL,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });
        setTitle("");
        setAuthor("");
        setBody("");
        updateVariableFunc();
      } catch (err) {
        // console.error(err);
        console.log(err)
      }
      history("/");
      setIsSubmitting(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: blog,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
    {!isLoading && (
    <div>
        {refToken && 
        <div>
      <div className="  mx-5 md:mx-10  mt-24">
            <p className="cursor-default font-extrabold text-2xl md:text-3xl lg:text-4xl pb-4 sm:pb-0 flex justify-center mb-4   text-emerald-800">Contribute Your Voice, Share Your Story
            </p>
        <div  className="flex  sm:justify-around gap-40">
          <div className="flex sm:items-center sm:gap-14 md:gap-24 lg:gap-24     sm:px-0">
            <div className="cursor-default h-16 sm:h-0 sm:w-[200px] md:w-[180px] lg:w-[400px]  text-xl md:text-2xl  lg:text-3xl  font-medium  text-red-500 sm:font-bold py-5 sm:py-0  ">
                <Typewriter 
                words={['Unlocking Knowledge,', 'One Post at a Time......']}
                loop
                cursor
                cursorStyle='_'
                typeSpeed={120}
                deleteSpeed={70}
                delaySpeed={1000}
                />
                
            </div>
            <div className="hidden sm:flex w-[350px] md:w-[450px]">
            <Lottie   options={defaultOptions} />
            </div>
          </div>
       </div>
      <p className="pt-8 text-lg font-bold">Welcome back {user !== null && user.displayName}</p>
      <div className="mt-6 border-t border-gray-100  ">
          <form onSubmit={handleFormSubmit}>
            <div className="divide-y divide-gray-100">
                {/* Title Section */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-0 sm:px-0">
                  <p className="text-lg font-medium leading-6 text-gray-900 pb-4">Title:</p>
                  <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* Textarea Section */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 pb-4">
                  <p className="text-lg font-medium leading-6 text-gray-900">Body:</p>
                  <textarea className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </div>
            </div>
            <div className="flex justify-center pt-6">
                
                {!isSubmitting && <button type="submit" className="inline-flex w-1/3 sm:w-1/4 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">Submit</button>}
                {isSubmitting && <button  className="inline-flex w-1/3 sm:w-1/4 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">Submitting</button>}
            </div>
          </form>
       </div>
       
    </div>
    <footer class="w-full bg-cyan-800 mt-[6rem] ">
            <div class="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
              <div class="w-full px-4 md:w-1/2 lg:px-0">
                <h1 class="max-w-sm text-3xl font-bold text-white mt-8 pb-3">Subscribe to our Blog Post</h1>
                <form action=""  class="mt-4 inline-flex w-full items-center md:w-3/4">
                  <input
                    class="flex h-10 w-full rounded-md border border-white  bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                  />
                  <button
                    type="submit"
                    class="ml-4 rounded-full   text-sm  shadow-sm  "
                  >
                    <BsFillArrowRightCircleFill  style={{fill:"white"}} size={35}/>
                  </button>
                </form>
                <div class="my-5 ml-2 lg:mb-0">
                  <Link to="/about">
                    <p className="font-bold   space-y-4 text-[14px]  text-white">About us</p>
                  </Link>
                </div>
              </div>
              <div class="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3 ">
              </div>
            </div>
            <hr class="my-4" />
            <div class="mx-auto max-w-6xl items-center justify-between px-4  md:flex lg:px-0 relative">
              <div class=" flex-wrap lmobile:flex  items-center justify-center lmobile:justify-between   w-full">
                <div className="flex lmobile:block justify-center">
                  <img className="w-[9rem] lmobile:pt-3  "  src={Logo} />
                </div >
                  {/* <div class="mt-4 md:mt- pb-3  "> */}
                    <p class="text-sm font-semibold text-white flex justify-center pb-5 lmobile:pb-0 lmobile:block ">
                      © 2023 Blog Saga. All rights reserved.
                    </p>
                  {/* </div> */}
              </div>
            </div>
    </footer>
    </div>
    }
    {!refToken && <Login/>}
    </div>
    )}
    {isLoading && <Loading />}
    </div>
  );
};

export default Addtest;
