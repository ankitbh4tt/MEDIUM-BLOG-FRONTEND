import React from 'react'
import LabeledInput from './LabeledInput'
import AuthButton from './AuthButton'
import { Link } from 'react-router-dom'

const LoginForm = () => {

  const handleLoginSubmit = ()=>{
    console.log('loggin in')
  }

  
  return (
    <div className='w-full'>
      <div className=''>
        <div className='flex justify-center text-3xl font-bold'>Ready to Dive In?</div>
        <div className='flex justify-center text-sm mt-2 text-slate-600'>Sign up here <Link to={'/signup'} className='text-blue-400 pl-2 underline'>Register</Link> </div>
        <div className='mt-2'>
          <LabeledInput type='text' label='Email' placeholder='example@gmail.com'/>
          <LabeledInput type='password' label='Password' placeholder='Enter Password'/>
          <AuthButton type='login' handleSubmit={handleLoginSubmit}/>
        </div>
      </div>
    </div>  )
}

export default LoginForm
