import { Link } from 'react-router-dom'
import LabeledInput from './LabeledInput'
import AuthButton from './AuthButton'

const RegisterForm = () => {
  
  const handleRegisterSubmit = ()=>{
    console.log("hii")
  }

  return (
    <div className='w-full'>
      <div className=''>
        <div className='flex justify-center text-3xl font-bold'>Create an account</div>
        <div className='flex justify-center text-sm mt-2 text-slate-600'>Already have an account? <Link to={'/signin'} className='text-blue-400 pl-2 underline'>Login</Link> </div>
        <div className='mt-2'>
          <LabeledInput type='text' label='Username' placeholder='Enter Your Username'/>
          <LabeledInput type='text' label='Email' placeholder='example@gmail.com'/>
          <LabeledInput type='password' label='Password' placeholder='Enter Password'/>
          <AuthButton type='register' handleSubmit={handleRegisterSubmit}/>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
