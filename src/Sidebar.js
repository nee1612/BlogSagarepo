import React, { useContext, useEffect} from "react";
import {FaHome} from "react-icons/fa"
import {IoIosCreate} from "react-icons/io"
import {LuLogOut} from "react-icons/lu"
import {BiLogIn, BiMessageAdd} from "react-icons/bi"
import { Link} from 'react-router-dom';
import {auth} from "./config/firebase"
import { signOut } from "firebase/auth";
import BlogContext from "./contexts/BlogContext";
import Cookies from "universal-cookie";
import { motion} from "framer-motion";
const cookies = new Cookies();

const Sidebar = ({isOpen}) => {
    // const[isOpen,setIsOpen]=useState(false);
    // const toggle=()=>setIsOpen(!isOpen);
    const {updateVariableFunc}=useContext(BlogContext);
    const refToken=cookies.get("auth-token");
    useEffect(()=>{
        updateVariableFunc();
    },[])
const logOut = async () => {
    
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      console.log(" sidebar reftoken:",refToken)
    } catch (err) {
      console.error(err);
    }
  };
    
    return ( 
        <div className="  ">
        <div className="fixed top-0  right-0 z-50  ">
            <div className={isOpen? "translate-y-0 w-60":"hidden"}>
            {/* <div animate={{width:isOpen?"250px":}} className="md:hidden h-screen bg-blue-950"> */}
            <div className="md:hidden  h-screen bg-black ">
                <div className="flex  justify-between items-center  px-3 py-5">
                    <div>
                       {isOpen &&  <p  className="text-3xl white-space:nowrap text-white">
                        𝕭𝖑𝖔𝖌𝕾𝖆𝖌𝖆
                        </p>}
                    </div>
                    <div className="pr-2 text-xl white-space:nowrap ">
                        {/* <FaBars onClick={toggle} style={{fill:"white"}}/> */}
                    </div>
                </div>
            <section>
                
                {/* {routes.map((route)=>(
                    <div>
                        <NavLink to={route.path} key={route.name}  >
                            <div className="flex gap-6 items-center pl-5  px-4 py-5 hover:border-r-2 border-white ">
                                <div className="white-space:nowrap">{route.icon}</div>
                                <AnimatePresence>
                                
                                {isOpen && <motion.div className="text-lg flex white-space:nowrap  text-white font-semibold">{route.name}Home</motion.div>}
                                </AnimatePresence>
                            </div>
                        </NavLink>
                    </div>
                ))} */}
                <div className="flex gap-6 items-center pl-5  px-4 py-5 hover:border-r-2 border-white ">
                    <Link to="/">
                    <div  className="white-space:nowrap flex items-center gap-6">
                        <div><FaHome size={22} style={{fill:"white"}}/></div>
                        <p className="text-lg flex white-space:nowrap  text-white font-semibold">Home</p>
                    </div>
                    </Link>
                </div>
                
                {
                    refToken?(
                        <div>
                        <div className="flex gap-6 items-center pl-5  px-4 py-5 hover:border-r-2 border-white ">
                                <Link to="/add">
                                <div  className="white-space:nowrap flex items-center gap-6">
                                    <div><BiMessageAdd size={22} style={{fill:"white"}}/></div>
                                    <p className="text-lg flex white-space:nowrap  text-white font-semibold">Add Blog</p>
                                </div>
                                </Link>
                            </div>
                        <div className="flex gap-6 items-center pl-5  px-4 py-5 hover:border-r-2 border-white  " onClick={logOut}>
                                <Link  to="/">
                                <div  className="white-space:nowrap flex items-center gap-6">
                                    <div><LuLogOut size={22} style={{fill:"white"}}/></div>
                                    <p className="text-lg flex white-space:nowrap  text-white font-semibold">Logout</p>
                                </div>
                                </Link>
                        </div>
                        
                        </div>
                    ):(
                        <div>
                            <div className="flex gap-6 items-center pl-5  px-4 py-5 hover:border-r-2 border-white ">
                                <Link to="/login">
                                    <div  className="white-space:nowrap flex items-center gap-6">
                                        <div><BiLogIn size={22} style={{fill:"white"}}/></div>
                                        <p className="text-lg flex white-space:nowrap  text-white font-semibold">Login</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex gap-6 items-center pl-5  px-4 py-5 hover:border-r-2 border-white ">
                                <Link to="/register">
                                    <div  className="white-space:nowrap flex items-center gap-6">
                                        <div><IoIosCreate size={22} style={{fill:"white"}}/></div>
                                        <p className="text-lg flex white-space:nowrap  text-white font-semibold">Sign Up</p>
                                    </div>
                                </Link>
                            </div>
                           
                        </div>
                    )
                }
               
                
                
            </section>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default Sidebar;