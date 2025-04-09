import { Link } from 'react-router-dom'
import LabeledInput from './LabeledInput'
import AuthButton from './AuthButton'
import React, { useState } from 'react'
import axios, { AxiosError } from "axios"
import { BACKEND_URI } from '../config/api'
import { toast ,ToastContainer} from 'react-toastify'

const RegisterForm = () => {
  const [formData,setFormData] = useState( {username:"",password:"",email:""})
  const handleRegisterSubmit =async ()=>{
    try {
      const response = await axios.post(BACKEND_URI+"user/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Equivalent to credentials: "include" for CORS
      })
      const data =response.data
      if(data.username){
        toast.success(`Hey ${data.username}👋!`, {
          position: 'top-right',
        });
      }
    }catch (error) {
      const axiosError = error as AxiosError<{ error?: string; details?: any }>; // Type the error response
      if (axiosError.response) {
        // Server responded with an error (e.g., 400, 401)
        const errorMessage =
          axiosError.response.data?.error || 'An error occurred during signup';
        toast.error(errorMessage, {
          position: 'top-left',
        });
      } else if (axiosError.request) {
        // No response received (e.g., network error, CORS)
        toast.error('No response from server. Check your network or server status.', {
          position: 'top-left',
        });
      } else {
        // Request setup error
        toast.error(axiosError.message || 'Failed to send request.', {
          position: 'top-left',
        });
      }
    }
  }
  const handleRegInput = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = event.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value,
    }))
    console.log(formData)
  }

  return (
    <div className='w-full'>
      <div className=''>
        <div className='flex justify-center text-3xl font-bold'>Create an account</div>
        <div className='flex justify-center text-sm mt-2 text-slate-600'>Already have an account? <Link to={'/signin'} className='text-blue-400 pl-2 underline'>Login</Link> </div>
        <div className='mt-2'>
          <LabeledInput type='text' label='Username' name="username" placeholder='Enter Your Username' handleInput = {handleRegInput}/>
          {<LabeledInput type='text' label='Email' name="email" placeholder='example@gmail.com' handleInput = {handleRegInput} />}
          <LabeledInput type='password' label='Password' name="password" placeholder='Enter Password' handleInput = {handleRegInput}/>
          <AuthButton type='register' handleSubmit={handleRegisterSubmit}/>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
