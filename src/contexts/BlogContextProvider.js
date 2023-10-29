import React, { useEffect, useState } from "react";
import BlogContext from "./BlogContext";
import { blogData, getCurrentUser, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  query,
  orderBy
} from "firebase/firestore";
import { useNavigate } from "react-router";
const BlogContextProvider = ({ children }) => {
  const [updateVariable, setUpdateVariable] = useState(true);
  const updateVariableFunc = () => {
    setUpdateVariable(!updateVariable);
  };
  const history = useNavigate();
  const [blgData, setBlgData] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const blogRef = collection(blogData, "BlogData");
  const [userName, setUserName] = useState("");
  // Pagination
  const totalPost = blgData.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = blgData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("noUser");
      console.log("username", userName);
    });
  }, []);

  //   Get blog data from Firestore database
  const blogLi = async () => {
    try {
      const blogs = await getDocs(query(blogRef, orderBy("createdAt", "desc")));
      // const blogs = await getDocs(blogRef);
      const filteredBlog = blogs.docs.map((blog) => ({
        ...blog.data(),
        id: blog.id,
      }));
      setBlgData(filteredBlog);
      setIsLoading(false);
      console.log("current",currentPosts);
      // currentPosts();
    } catch (err) {
      console.error(err);
    }
  };

  


  // redirect to login page
  const pleaseLogin = () => {
    const currentUser = getCurrentUser();
    if (currentUser === null) {
      history("/login");
    } else {
      setUser(currentUser);
    }
  };
  useEffect(() => {
    blogLi();
    // currentPosts();
  }, [updateVariable]);

  return (
    <BlogContext.Provider
      value={{
        blgData,
        setBlgData,
        isLoading,
        setIsLoading,
        updateVariable,
        updateVariableFunc,
        pleaseLogin,
        user,
        setUser,
        blogLi,
        userName,
        currentPosts,
        postPerPage,
        totalPost,
        paginate,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
export default BlogContextProvider;
