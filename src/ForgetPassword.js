import { useState } from "react";
import { sendPasswordResetEmail,emai } from "firebase/auth";
import {auth} from "./config/firebase"
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {
    const history=useNavigate();
    const [email,setEmail]=useState("");
    const[invalid,setInvalid]=useState(false);
    const [sent,setSent]=useState("Enter your Registerd Email");
    const handleSubmit = async(e)=>{
        e.preventDefault();
        sendPasswordResetEmail(auth,email).then(data=>{
            console.log("Data")
            setSent("Email Sent");
        }).catch(err=>{
            setInvalid("Invalid Account !")
            alert(err.code)
        })
        setTimeout(()=>{
          history('/')
        },2000)
        // history('/');

    }
    return ( 
        <div className="flex justify-center w-full h-[calc(100vh-100px)] items-center ">
            <div className=" lg:w-2/6" >
                <h1 className=" mb-12 flex justify-center text-4xl font-bold">Forget Password</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                        <label for="" className="text-base font-medium text-gray-900">
                          {" "}
                          Email address{" "}
                        </label>
                        <div className="mt-2">
                          <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                         <p className="text-sm font-bold text-red-700">{invalid}</p>
                      </div>
                      <div className="mt-3 space-y-3">
                      <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          Sign In
                        </button>
                        <div>{sent}</div>
                  </div>
                </form>
            </div>
        </div>

     );
}
 
export default ForgetPassword;