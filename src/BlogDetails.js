import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  deleteDoc,
  doc,
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Login from "./Login";
import { blogData, getCurrentUser, db, auth } from "./config/firebase";
import BlogContext from "./contexts/BlogContext";
import Loading from "./Loading";
import moment from "moment";
import conversation from "./assets/conversation.json";
import { RiDeleteBin7Fill } from "react-icons/ri";
import conv from "./assets/conv.json";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const TestDetail = () => {
  const currentUser = getCurrentUser();
  const { id } = useParams();
  const {
    blgData,
    updateVariableFunc,
    pleaseLogin,
    user,
    isLoading,
    userName,
  } = useContext(BlogContext);
  const [blog, setBlog] = useState(null);
  const [deleting, setIsDeleting] = useState(false);
  const history = useNavigate();
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [authState, setAuthState] = useState(cookies.get("auth-token"));
  const refToken = cookies.get("auth-token");

  // Convert sec to dd-mm-yyyy
  // const toDate = (sec) => {
  //   let date = new Date(sec * 1000);
  //   const monthsName = ["Jan", "Feb", "Mar", "Apr" ,"Jun" ,"Jul", "Aug", "Sept", "Oct" ,"Nov"];
  //   const day = date.getDate();
  //   const month = monthsName[date.getMonth()];
  //   const year = date.getFullYear();
  //   return `${day}-${month}`;
  // };

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("id", "==", id),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const filteredDataById = (id) => {
    let tempData;
    tempData = blgData.filter((item) => {
      return item.id === id;
    });
    console.log(tempData);
    return tempData[0];
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      photoURL: currentUser.photoURL,
      id,
    });

    setNewMessage("");
  };

  // function to delete a Blog
  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const del = doc(blogData, "BlogData", id);
      await deleteDoc(del);
      updateVariableFunc();
    } catch (err) {
      console.error(err);
    }
    history("/");
    setIsDeleting(false);
  };
  // function to delete chat
  const handleDeleteC = async (id) => {
    setIsDeleting(true);
    try {
      const del = doc(db, "messages", id);
      await deleteDoc(del);
    } catch (err) {
      console.error(err);
    }
    setIsDeleting(false);
  };
  // lottie
  const message = {
    loop: true,
    autoplay: true,
    animationData: conversation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  useEffect(() => {
    if (authState === undefined) {
      pleaseLogin();
      // window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      if (blgData.length !== 0) {
        setBlog(filteredDataById(id));
      }
    }
  }, [id, blgData]);

  return (
    <div>
      {refToken && (
        <div>
          <div>
            {!isLoading && (
              <div className="">
                {blog !== null && (
                  <div classNameName=" ">
                    <div className="flex items-center justify-center  ">
                      <div className=" w-[90%] mx-3 mt-24  p-6 rounded-lg  bg-gray-800 shadow-lg hover:shadow-xl  hover:transition-all relative">
                        {/* <div className="  min-w-[280px] mx-3 lg:w-[600px] mt-4 max-w-[900px] p-6 rounded-lg  bg-gray-800 shadow-md hover:shadow-xl  hover:transition-all relative"> */}
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {blog.Title}
                        </h5>
                        <div className="py-2 flex items-center gap-2">
                          {blog.Photo ? (
                            <img
                              src={blog.Photo}
                              className="rounded-full w-8"
                            />
                          ) : (
                            // <BiUserCircle style={{ fill: "white" }} />
                            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white text-black text-lg font-bold">
                              {blog.User[0].toUpperCase()}
                            </div>
                          )}
                          <p className="text-gray-400">{blog.User}</p>
                        </div>
                        <p className="mb-3  text-white text-lg font-medium">
                          {blog.Body}
                        </p>
                        {blog.userId === currentUser.uid && (
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-800 rounded-sm hover:bg-emerald-700 "
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {isLoading && <Loading />}
              </div>
            )}
          </div>
          {/* Chat section */}
          <div className=" flex justify-center mt-3  ">
            <div className=" shadow-lg w-[calc(100%-10%)] rounded-md">
              <div className="flex justify-center  mt-4">
                <p className="w-[100%]  px-4 sm:p-3 font-black text-xl sm:text-2xl md:text-3xl font-mono">
                  Add a new Comment
                </p>
              </div>
              <div className="flex items-center justify-center   ">
                <form
                  onSubmit={handleSubmit}
                  className=" w-[100%]  sm:flex sm:gap-2  p-3 "
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    className="sm:flex-1 w-full  border-solid border-black border-2 rounded-lg  outline-none bg-transparent text-xs text-gray-800 p-3 my-2"
                    placeholder="Type your comments here..."
                  />
                  <button
                    type="submit"
                    className="border-none outline-none bg-black text-base text-white   font-semibold sm:font-bold sm:py-0 my-2 py-1 px-5  rounded-md    sm:rounded-lg"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 border-b-[1px] border-gray-300 pb-5 ">
            <div className="w-[90%] ">
              <p className=" pl-2 font-bold text-3xl font-mono">Comments...</p>
            </div>
          </div>
          <div className="">
            <div className=" flex justify-center  rounded-md  mt-4  z-0  ">
              <div className="flex justify-center w-[100%]">
                <div className="h-[100%] overflow-y-auto p-3">
                  {messages.map((message) => (
                    <div key={message.id} className=" flex-col  ">
                      <p className="font-bold flex items-start   gap-1   ">
                        <div className="flex items-start gap-3 mt-2 pb-4 ">
                          <div className="pt-2">
                            {message.photoURL ? (
                              <img
                                className="rounded-full w-[25px]  sm:w-7  "
                                src={message.photoURL}
                              />
                            ) : (
                              <div className="w-[24px] h-[25px] sm:w-7   sm:h-7  flex justify-center items-center border-[1px] border-gray-300 rounded-full bg-white text-black text-sm sm:text-lg font-bold">
                                {message.user[0].toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="w-[calc(100vw-90px)] lmobile:w-[calc(100vw-80px)] sm:w-[calc(100vw-100px)] md:w-[calc(100vw-120px)] lg:w-[calc(100vw-180px)] xl:w-[calc(100vw-160px)] 2xl:w-[calc(100vw-200px)]  ">
                            <div className="border-[1.5px] rounded-md border-gray-200 bg-slate-100  shadow-sm ">
                              <div className=" flex  items-center gap-2 text-lg sm:text-xl px-2 pt-2 ">
                                {message.user}:
                                <p className="font-medium text-sm">
                                  {message.createdAt !== null
                                    ? moment(
                                        message.createdAt.toDate()
                                      ).fromNow()
                                    : "a few seconds ago"}
                                </p>
                                {message.userId === currentUser.uid && (
                                  <RiDeleteBin7Fill
                                    style={{ fill: "black" }}
                                    onClick={() => handleDeleteC(message.id)}
                                  />
                                )}
                              </div>
                              <div className="text-base font-medium  p-2">
                                {message.text}
                              </div>
                            </div>
                          </div>
                        </div>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!refToken && <Login />}
    </div>
  );
};

export default TestDetail;
