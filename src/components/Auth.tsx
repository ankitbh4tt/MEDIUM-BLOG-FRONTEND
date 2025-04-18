import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Quote from "./Quote";

interface AuthProps {
  type: string;
}
const Auth:React.FC<AuthProps> = ({type}) => {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  h-dvh">
      <div className="flex justify-center items-center p-10 ">
        <div className="p-4 w-full h-full flex items-center justify-center" >
        {type==='signin'?<LoginForm/>:<RegisterForm/>}
        </div>
      </div>
      <div className="hidden lg:flex">
        <div className="flex justify-center items-center p-10 bg-slate-300 shadow-2xl rounded-xs">
          <div className="p-10">
            <Quote/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
