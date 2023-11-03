import { auth, googleProvider } from "./config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useContext } from "react";
import { BsFillArrowRightCircleFill} from "react-icons/bs";
import Logo from './assets/logo_transparent.png';
import { useState } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import Loading from "./Loading";
import loginLottie from "./assets/Login.json"
import loginBg from "./assets/login bg.json"
import googleLog from "./assets/google.json"
import { Link } from "react-router-dom";
import BlogContext from "./contexts/BlogContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid,setIsValid] = useState("");
  const { isLoading } = useContext(BlogContext);
  const signIn = async (e) => {
      e.preventDefault();
      try {
        const result=await signInWithEmailAndPassword(auth, email, password);
        cookies.set("auth-token", result.user.refreshToken);
        history("/");
       } catch (err) {
          console.error(err);
          setIsValid("*Invalid Account")
      
    }
  };
  const SignInWithGoogle = async () => {
    try {
      const result=await signInWithPopup(auth, googleProvider);
      cookies.set("auth-token", result.user.refreshToken);
      history("/");
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

    return (
      <div> 
              {!isLoading && (
      <div>
      <section className=" mt-16 smobile:mt-10 mmobile:mt-7">
            <div className="grid  lg:grid-cols-2">
              <div className=" w-[100%] ">
                <div>
                  <Lottie  animationData={loginLottie} loop={true} />
                </div>
              </div>
              {/* <div className="hidden sm:flex">
               <Lottie options={defaultOptions} width={500}/>
              </div> */}
              <div className=" flex  justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="w-11/12 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                  <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                    Sign in
                  </h2>
                  <p className="my-3 text-sm text-gray-600">
                    Don&#x27;t have an account?{" "}
                    <Link className="font-semibold text-black transition-all duration-200 hover:underline" to="/register">
                    Create  Account
                    </Link>
                  </p>
                  <form  onSubmit={signIn}>
                    <div className="space-y-5">
                      <div>
                        <label for="" className="text-base font-medium text-gray-900">
                          {" "}
                          Email address{" "}
                        </label>
                        <div className="mt-2">
                          <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label for="" className="text-base font-medium text-gray-900">
                            {" "}
                            Password{" "}
                          </label>
                          <Link className="text-sm font-semibold text-black hover:underline" to="/reset">
                            
                            {" "}
                            Forgot password?{" "}
                          </Link>
                         
                         
                        </div>
                        <div className="mt-2">
                          <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                         <p className="text-sm font-bold text-red-700">{isValid}</p>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="mt-3 space-y-3">
                  <button
                            type="submit"
                            className="relative inline-flex h-12 w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            onClick={SignInWithGoogle}>
                            <span className="mr-2 inline-block w-[3.2rem]">
                                <Lottie className="lottieGoogle" animationData={googleLog} loop={true} />
                            </span>
                            Sign in with Google
                          </button>
                  </div>
                </div>
              </div>
            </div>
        </section>
        <footer class="w-full bg-cyan-800  ">
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
        )}
        {isLoading && <Loading />}
        </div>
     );
}
 
export default Login;