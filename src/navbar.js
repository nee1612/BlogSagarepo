import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "./config/firebase"
import { signOut } from "firebase/auth";
import BlogContext from "./contexts/BlogContext";
import Cookies from "universal-cookie";
import { motion} from "framer-motion";
const cookies = new Cookies();

const Navbar = ({ click }) => {
  const history = useNavigate();
  const {updateVariableFunc}=useContext(BlogContext);
  const refToken = cookies.get("auth-token");
  const logOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      console.log(" sidebar reftoken:",refToken);
      updateVariableFunc();
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <div>
   
    <div class="top-0 z-50 w-full  border-b shadow-md border-gray-300 bg-white  fixed py-1">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div class="inline-flex items-center space-x-2 pt-2 md:pt-0 ">
          <span
            class="font-bold text-3xl cursor-pointer"
            onClick={() => {
              history("/");
            }}
          >
            𝕭𝖑𝖔𝖌𝕾𝖆𝖌𝖆
          </span>
         
        </div>
        <div class="hidden grow items-start md:flex ">
          <ul class="ml-12 inline-flex space-x-10 my-[5px] ">
            <li >
              <Link
                className=" hover:border-b-[2px] border-purple-700 inline-flex items-center text-sm font-bold text-gray-800 hover:text-gray-900 "
                to="/"
              >
               Home
              </Link>
            </li>
            <li>
              <Link
                class="hover:border-b-[2px] border-purple-700 inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                to="/about"
              >
                About
              </Link>
            </li>
            {
              refToken && 
            <li>
              <Link
                class="hover:border-b-[2px] border-purple-700 inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                to="/add"
              >
                Add Blog
              </Link>
            </li>
            }
          </ul>
        </div>
        <motion.div>

        </motion.div>
        <div class="hidden space-x-2 md:block">
          {refToken ? (
            <button onClick={logOut} className="inline-flex w-full items-center justify-center rounded-sm bg-slate-800  px-3.5 py-1 font-medium leading-6 text-white hover:bg-black/80">
              Logout
            </button>
          ) : (
            <div>
              <button className="pr-2">
              <motion.div whileHover={{ scale: 1.1  }}
                whileTap={{
                  scale: 1,
                  borderRadius: "100%"
                }}>
                <Link
                  class="rounded-md bg-transparent px-3 py-2  text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  to="/register"
                >
                  Sign In
                </Link>
                </motion.div>
              </button>
              <button>
              <motion.div whileHover={{ scale: 1.1  }}
                whileTap={{
                  scale: 1,
                  borderRadius: "100%"
                }}>
                <Link
                  class="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  to="/login"
                >
                  Log In
                </Link>
          </motion.div>
              </button>
            </div>
          )}
        </div>
        <div onClick={click} class="md:hidden absolute top-7 right-4 z-50">
          <FaBars size={22} />
        </div>
        {/* <TTR/> */}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
