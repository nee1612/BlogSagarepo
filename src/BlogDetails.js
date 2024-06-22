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

import conversation from "./assets/conversation.json";

import conv from "./assets/conv.json";
import Cookies from "universal-cookie";
import Comment from "./Comment";
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
    } else {
      if (blgData.length !== 0) {
        setBlog(filteredDataById(id));
      }
    }
  }, [id, blgData]);
  const navigate = useNavigate();

  return (
    <div>
      {refToken && (
        <div>
          <div>
            {!isLoading && (
              <div className="">
                <div className="  mt-20 pl-14">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(31, 41, 55)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-left"
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </div>
                {blog !== null && (
                  <div classNameName=" ">
                    <div className="flex items-center justify-center  ">
                      <div className=" w-[90%] mx-3 mt-5 p-6 rounded-lg  bg-gray-800 shadow-lg hover:shadow-xl  hover:transition-all relative">
                        {/* <div className="  min-w-[280px] mx-3 lg:w-[600px] mt-4 max-w-[900px] p-6 rounded-lg  bg-gray-800 shadow-md hover:shadow-xl  hover:transition-all relative"> */}
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-white">
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
          <Comment
            messages={messages}
            handleSubmit={handleSubmit}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleDeleteC={handleDeleteC}
            currentUser={currentUser}
          />
        </div>
      )}
      {!refToken && <Login />}
    </div>
  );
};

export default TestDetail;
