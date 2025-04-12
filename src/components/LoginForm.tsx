import React, { useState } from 'react'
import LabeledInput from './LabeledInput'
import AuthButton from './AuthButton'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URI } from '../config/api'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [formData,setFormData] = useState({username:"",password:""})
  const navigate = useNavigate()
  const handleLoginSubmit =async ()=>{
    try {
      const response = await axios.post(`${BACKEND_URI}user/signin`,formData,{
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
      })

      const data = response.data
      if(data){
        toast.success('Logged In Successfully!',{
          position:'top-left'
        })
        sessionStorage.setItem('token',`Bearer `+data.token)
        navigate('/')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || 'Something went wrong';
        toast.error(msg,({
          position:"top-right"
        }))
      }
    }
  }
  const handleLoginInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
    const {name ,value } = event.target;
    setFormData((prev)=>({
      ...prev,[name]:value
    }))
  } 

  
  return (
    <div className='w-full'>
      <div className=''>
        <div className='flex justify-center text-3xl font-bold'>Ready to Dive In?</div>
        <div className='flex justify-center text-sm mt-2 text-slate-600'>Sign up here <Link to={'/signup'} className='text-blue-400 pl-2 underline'>Register</Link> </div>
        <div className='mt-2'>
        <LabeledInput type='text' label='Email' name='email' placeholder='example@gmail.com' handleInput={handleLoginInput}/>
        <LabeledInput type='password' label='Password' name='password' handleInput={handleLoginInput} placeholder='Enter Password'/>
          <AuthButton type='login' handleSubmit={handleLoginSubmit}/>
        </div>
      </div>
    </div>  
  )
}


export default LoginForm