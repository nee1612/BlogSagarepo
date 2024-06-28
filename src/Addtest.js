import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { blogData, auth, getCurrentUser, userData } from "./config/firebase";
import { useNavigate } from "react-router-dom";
import BlogContext from "./contexts/BlogContext";
import Lottie from "lottie-react";
import blog from "./assets/blog.json";
import Loading from "./Loading";
import { Typewriter } from "react-simple-typewriter";
import Cookies from "universal-cookie";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Logo from "./assets/logo_transparent.png";
import { Link } from "react-router-dom";
import Login from "./Login/Login";
const cookies = new Cookies();

const toolbarOptions = [
  [{ font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],
  ["link"],
  ["clean"],
];

const Addtest = () => {
  const history = useNavigate();
  const { isLoading } = useContext(BlogContext);
  const [user, setUser] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userBlog, setUserBlog] = useState({
    title: "",
    body: "",
  });

  const blogRef = collection(blogData, "BlogData");
  const authRef = collection(userData, "userCred");
  const refToken = cookies.get("auth-token");
  const { updateVariableFunc, pleaseLogin } = useContext(BlogContext);
  const currentUser = getCurrentUser();
  const [authState, setAuthState] = useState(cookies.get("auth-token"));
  const [isValid, setIsValid] = useState("");
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
    if (userBlog.title === "" || userBlog.body === "") {
      setIsValid("*Please fill all the fields");
    } else {
      setIsValid("");
      try {
        await addDoc(blogRef, {
          Body: userBlog.body,
          Title: userBlog.title,
          User: user.displayName,
          Photo: user.photoURL,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });
        setUserBlog({
          title: "",
          body: "",
        });

        updateVariableFunc();
      } catch (err) {
        // console.error(err);
        console.log(err);
      }
      history("/");
      setIsSubmitting(false);
    }
  };
  const [showEditor, setShowEditor] = useState(false);
  const [placeholderData, setPlaceholderData] = useState("");
  const [newName, setNewName] = useState("");
  const handleEditor = (placeHolderName, newNameInp) => {
    setPlaceholderData(placeHolderName);
    setNewName(newNameInp);
    setShowEditor(!showEditor);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (placeHolderName === "Title") {
      setBlogInput(userBlog.title || "");
    } else if (placeHolderName === "Body") {
      setBlogInput(userBlog.body || "");
    }

    console.log(placeholderData, newName, "handleEditor");
  };
  const [blogInput, setBlogInput] = useState("");
  const handleBlogInput = (content) => {
    if (content === "<p><br></p>") {
      setPlaceholderData(placeholderData);
      setBlogInput("");
      return;
    } else {
      setBlogInput(content);
    }
  };

  const [value, setValue] = useState("");
  console.log(value);
  const [preview, setPreview] = useState(false);
  const handlePreview = () => {
    setPreview(!preview);
  };
  const AddData = () => {
    setUserBlog((prev) => ({ ...prev, [newName]: blogInput }));
    console.log(userBlog, "userBlog");
    setShowEditor(!showEditor);
    const halfPageHeight = document.documentElement.scrollHeight / 4;
    window.scrollTo({ top: halfPageHeight, behavior: "smooth" });
  };

  const formatBox = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formatBox.current && !formatBox.current.contains(event.target)) {
        setShowEditor(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      {!isLoading && (
        <div>
          {refToken && (
            <div className="">
              <div className="  mx-5 md:mx-10  pt-24 ">
                <p className="cursor-default font-extrabold text-2xl md:text-3xl lg:text-4xl pb-4 sm:pb-0 flex justify-center mb-4   text-emerald-800">
                  Contribute Your Voice, Share Your Story
                </p>
                <div className="flex  sm:justify-around gap-40">
                  <div className="flex sm:items-center sm:gap-14 md:gap-24 lg:gap-24     sm:px-0">
                    <div className="cursor-default h-16 sm:h-0 sm:w-[200px] md:w-[180px] lg:w-[400px]  text-xl md:text-2xl  lg:text-3xl  font-medium  text-red-500 sm:font-bold py-5 sm:py-0  ">
                      <Typewriter
                        words={[
                          "Unlocking Knowledge,",
                          "One Post at a Time......",
                        ]}
                        loop
                        cursor
                        cursorStyle="_"
                        typeSpeed={120}
                        deleteSpeed={70}
                        delaySpeed={1000}
                      />
                    </div>
                    <div className="hidden sm:flex w-[350px] md:w-[450px]">
                      <Lottie animationData={blog} loop={true} />
                    </div>
                  </div>
                </div>
                <p className="pt-8 text-lg font-bold">
                  Welcome back {user !== null && user.displayName}
                </p>
                <div className="mt-6 border-t border-gray-100  ">
                  <form onSubmit={handleFormSubmit}>
                    <div className=" relative">
                      {/* Title Section */}
                      <div className="px-4 py-6 sm:flex   sm:px-0">
                        <p className="text-lg  w-[25%] font-semibold  text-gray-900 pb-4">
                          Title:
                        </p>
                        <div
                          className=" preview-content   w-[100%]  sm:w-[60vw] overflow-hidden  rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Title"
                          contentEditable="false"
                          dangerouslySetInnerHTML={{
                            __html: userBlog.title || "Title",
                          }}
                          onClick={(e) => {
                            handleEditor("Title", "title");
                          }}
                        />
                      </div>
                      {/* Body Section */}
                      <div className="px-4 py-6 sm:flex   sm:px-0">
                        <p className="text-lg w-[25%] font-semibold  leading-6 text-gray-900 pb-4">
                          Body:
                        </p>
                        <div
                          className=" preview-content max-h-[60rem] w-[100%]  sm:w-[60vw] overflow-hidden 
                          overflow-y-auto rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          contentEditable="false"
                          dangerouslySetInnerHTML={{
                            __html: userBlog.body || "Body",
                          }}
                          onClick={(e) => {
                            handleEditor("Body", "body");
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center pt-6">
                      {!isSubmitting && (
                        <button
                          type="submit"
                          className="inline-flex w-1/3 sm:w-1/4 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          Submit
                        </button>
                      )}
                      {isSubmitting && (
                        <button className="inline-flex w-1/3 sm:w-1/4 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                          Submitting
                        </button>
                      )}
                      {showEditor ? (
                        <div
                          className=" absolute top-36  left-[15%] "
                          ref={formatBox}
                        >
                          <ReactQuill
                            theme="snow"
                            modules={{ toolbar: toolbarOptions }}
                            placeholder={placeholderData}
                            value={blogInput}
                            onChange={(event) => {
                              handleBlogInput(event);
                            }}
                            className="formatTextContainer w-[70vw] mx-auto overflow-hidden break-all  "
                          />
                          <div className="flex justify-center">
                            <button
                              className="flex w-1/3 mt-3 sm:w-28 items-center justify-center rounded-md bg-[#065f46] px-1.5 py-1 z-50 font-semibold leading-7 text-white hover:bg-[#14392f]"
                              onClick={AddData}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <footer class="w-full bg-cyan-800 mt-[6rem] ">
                <div class="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
                  <div class="w-full px-4 md:w-1/2 lg:px-0">
                    <h1 class="max-w-sm text-3xl font-bold text-white mt-8 pb-3">
                      Subscribe to our Blog Post
                    </h1>
                    <form
                      action=""
                      class="mt-4 inline-flex w-full items-center md:w-3/4"
                    >
                      <input
                        class="flex h-10 w-full rounded-md border border-white  bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                      />
                      <button
                        type="submit"
                        class="ml-4 rounded-full   text-sm  shadow-sm  "
                      >
                        <BsFillArrowRightCircleFill
                          style={{ fill: "white" }}
                          size={35}
                        />
                      </button>
                    </form>
                    <div class="my-5 ml-2 lg:mb-0">
                      <Link to="/about">
                        <p className="font-bold   space-y-4 text-[14px]  text-white">
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
                    {/* <div class="mt-4 md:mt- pb-3  "> */}
                    <p class="text-sm font-semibold text-white flex justify-center pb-5 lmobile:pb-0 lmobile:block ">
                      © 2023 Blog Saga. All rights reserved.
                    </p>
                    {/* </div> */}
                  </div>
                </div>
              </footer>
            </div>
          )}
          {!refToken && <Login />}
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default Addtest;
