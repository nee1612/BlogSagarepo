import { auth, googleProvider,userData } from "./config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,updateProfile
} from "firebase/auth";
import { addDoc,collection} from "firebase/firestore";
import React, { useContext } from "react";
import { useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Lottie from "react-lottie";
import signUpLottie from "./assets/signup.json"
import googleLog from "./assets/google.json"
import loginBg from "./assets/login bg.json"
import { BsFillArrowRightCircleFill} from "react-icons/bs";
import Logo from './assets/logo_transparent.png';
import Cookies from "universal-cookie";
const cookies = new Cookies();


const Register = () => {
  const history = useNavigate();
  const [displayName,setDisplayName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isValid,setIsValid] = useState("");
  const [creactAc,setCreatAc]=useState(false);
  const [incorrectPassword,setInCorredtPassword]=useState(false);
  // const refToken=cookies.get("auth-token");
  const authRef = collection(userData, "userCred");

  const signIn = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      setInCorredtPassword("Password not match");
      return false;
    }
    setCreatAc(true);
    try {
      createUserWithEmailAndPassword(auth,email,cPassword)
       .then(async(res)=>{
        const user=res.user;
        cookies.set("auth-token", res.user.refreshToken);
        await updateProfile(user,{
          displayName:displayName,
        });
        try{
           await addDoc(authRef,{
            username:displayName,
            email:email,
            password:cPassword,
            userId: auth.currentUser.uid,
          }
          );
          history("/");
        }catch(err){
            console.error(err)
        }
       }).catch((err)=>{
        console.log(err.message);
       })
    } catch (err) {
      console.error(err);
      setIsValid(err.message);
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
  const defaultOptions1 = {
    loop: true,
    autoplay: true, 
    animationData: signUpLottie ,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};
const defaultOptions2 = {
  loop: true,
  autoplay: true, 
  animationData: googleLog,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
    return ( 
      <div>
        <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 mmobile:mt-4">

    <div className="h-full  w-full">
      <div className="flex justify-center  lg:hidden mt-7">
        <div className="flex justify-center w-[50%]">
        <Lottie options={defaultOptions1} />
        </div>
      </div>
          {/* jbm */}
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="w-11/12 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <Link className="font-semibold text-black transition-all duration-200 hover:underline" to="/Login">
                    Sign In
                    </Link>
              </p>
              <form className="signin" onSubmit={signIn} >
                <div className="space-y-5">
                  <div>
                    <label for="name" className="text-base font-medium text-gray-900">
                      {" "}
                      Full Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="User Name"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label for="email" className="text-base font-medium text-gray-900">
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
                      <label
                        for="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
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
                    <div className="flex items-center justify-between">
                      <label
                        for="ConfirmPassword"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Confirm Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                            <p className="text-sm font-bold text-red-700">{isValid} {incorrectPassword}</p>
                  </div>

                  <div>
                    {!creactAc &&
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Create Account
                    </button>
                    }
                  </div>
                  <div>
                    {creactAc && 
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Creating Account
                      
                    </button>
                    }
                  </div>
                </div>
              </form>
              <div className="mt-3 space-y-3 " >
                <button
                  type="button"
                  className="relative inline-flex h-12 w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                   onClick={SignInWithGoogle}>
                  <span className="mr-2 inline-block">
                      <Lottie className="lottieGoogle" options={defaultOptions2} width={50}/>
                  </span>
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
          </div>
          <div className="h-full mt-8 w-full">
              <div className="hidden lg:flex w-[500px]  ">
                   <Lottie options={defaultOptions1}  />
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
     );
}
 
export default Register ;