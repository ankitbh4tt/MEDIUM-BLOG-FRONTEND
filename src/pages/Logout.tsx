import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            sessionStorage.removeItem('token')
            toast.success("Logged Out Successfully!",{position:"top-right"})
            navigate('/signin')
        }
    },[])

  return (
    <div>
      
    </div>
  )
}

export default Logout
