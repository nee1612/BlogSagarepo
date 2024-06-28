import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogContextProvider from "./contexts/BlogContextProvider";
import Navbar from "./navbar";
import Home from "./Home/Home.js";
import BlogDetails from "./BlogDetails/BlogDetails.js";
import NotFound from "./NotFound";
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";
import Addtest from "./Addtest";
import ForgetPassword from "./ForgetPassword";
import Cookies from "universal-cookie";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import TextEditor from "./TextEditor.js";
import Dashboard from "./Dashboard/Dashboard.js";
import MovingShapes from "./MovingShapes.js";
import About from "./About/About.js";
import BlogDetailDash from "./Dashboard/BlogDetailDash.js";
import EditBlog from "./Dashboard/EditBlog.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <BrowserRouter>
      <BlogContextProvider>
        <ToastContainer />
        <div className="App ">
          <Navbar click={toggle} />
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <Backdrop click={toggle} isOpen={isOpen} />

          {/* <MovingShapes /> */}
          <div className="content  ">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detail/:id" element={<BlogDetails />} />
              <Route path="/add" element={<Addtest />} />
              <Route path="/reset" element={<ForgetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/edittext" element={<TextEditor />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/detail" element={<BlogDetailDash />} />
              <Route path="/dashboard/edit" element={<EditBlog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BlogContextProvider>
    </BrowserRouter>
  );
}

export default App;
