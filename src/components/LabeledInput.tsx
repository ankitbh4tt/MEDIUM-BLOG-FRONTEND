import React from 'react'
import { IoIosEye } from "react-icons/io";

interface labelInputType{
  type:string,
  label:string,
  placeholder:string
  
}

const LabeledInput:React.FC<labelInputType> = ({type,label,placeholder}) => {
  return (
    <div className='w-full'>
      <div className='pb-4 px-4 pt-2 flex flex-col gap-0.5 rounded-l'>
        <div className='font-semibold'>{label}</div>
        <div className='flex'>
        <input type={type} className='border-1 border-slate-400 rounded-md h-8 p-4 w-full' placeholder={placeholder}  />
          {type === "password" && (
            <div id='eyeIcons'>
              <IoIosEye className="relative right-6 top-4 transform -translate-y-1/2 text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LabeledInput
