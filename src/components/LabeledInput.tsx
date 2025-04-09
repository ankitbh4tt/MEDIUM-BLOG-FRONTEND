import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

interface labelInputType{
  type:string,
  label:string,
  name:string,
  placeholder:string,
  handleInput:(event:React.ChangeEvent<HTMLInputElement>)=>void
}


const LabeledInput:React.FC<labelInputType> = ({type,label,placeholder,name,handleInput}) => {
  const [isPassVisible,setIsPassVisible] = useState(false)
  const inputType = type === 'password' && isPassVisible ? 'text' : type;
  const handleShowPass = ()=>{
      setIsPassVisible((prev) => !prev);
  }


  return (
    <div className='w-full'>
      <div className='pb-4 px-4 pt-2 flex flex-col gap-0.5 rounded-l'>
        <div className='font-semibold'>{label}</div>
        <div className='flex'>
        <input type={inputType} name={name} className='border-1 border-slate-400 rounded-md h-8 p-4 min-w-full' placeholder={placeholder} onChange={(e)=>handleInput(e)}  />
          {type === "password" && (
            <div id='eyeIcons'>
              {
                isPassVisible?
                <IoIosEyeOff onClick={handleShowPass} className="relative right-6 top-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-800" />     
                :
                <IoIosEye onClick={handleShowPass} className="relative right-6 top-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-800" />
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LabeledInput
