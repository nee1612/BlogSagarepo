import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogContextProvider from "./contexts/BlogContextProvider";
import Navbar from "./navbar";
import Home from "./Home";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Login from "./Login";
import Register from "./Register";
import Addtest from "./Addtest.js";
import ForgetPassword from "./ForgetPassword";
import Cookies from "universal-cookie";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import About from "./About";
import TextEditor from "./TextEditor.js";

function App() {
  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     console.log(user);
  //     if (user) {
  //       setUserName(user.displayName);
  //     } else setUserName("");
  //     console.log(user);
  //   });
  // }, []);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <BrowserRouter>
      <BlogContextProvider>
        <div className="App ">
          <Navbar click={toggle} />
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <Backdrop click={toggle} isOpen={isOpen} />
          <div className="content">
            <Routes>
              {/* <Route exact path="/" element={<Home name={userName} />} /> */}
              <Route exact path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detail/:id" element={<BlogDetails />} />
              <Route path="/add" element={<Addtest />} />
              <Route path="/reset" element={<ForgetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/edittext" element={<TextEditor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BlogContextProvider>
    </BrowserRouter>
  );
}

export default App;
