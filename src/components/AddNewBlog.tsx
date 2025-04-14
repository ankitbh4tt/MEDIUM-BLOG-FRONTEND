import React, { useEffect } from 'react'
import Navbar from './Navbar'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URI } from '../config/api'

interface AxiosErrorType {
  message: string;
  error: {
    name: string; // e.g., "JwtTokenInvalid"
  };
}

const AddNewBlog = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.info('Please login to post blogs!', { position: 'top-right' });
        localStorage.setItem("lastPage",'/newBlog')
        navigate('/signin');
        return;
      }
      try {
        const result = await axios.get(`${BACKEND_URI}blog/isAuthenticated`, {
          headers: {
            Authorization: token, // Ensure proper Bearer token format
          },
        });
        const data = result.data;
        if (data.userId) {
          toast.info('Write content to post!', { position: 'bottom-right' });
        }
      } catch (error) {
        const axiosError = error as AxiosError<AxiosErrorType>;
        if (axios.isAxiosError(axiosError) && axiosError.response) {
          const errorData = axiosError.response.data;
          if (errorData.error?.name === 'JwtTokenInvalid') {
            toast.error('Invalid token. Please sign in again.', { position: 'top-right' });
            sessionStorage.removeItem('token'); // Clear invalid token
            navigate('/signin');
          } else if (errorData.message === 'Internal server error during authentication') {
            toast.error('Server error. Please try again later.', { position: 'top-right' });
          } else {
            toast.error('An unexpected error occurred.', { position: 'top-right' });
          }
        } else {
          console.error('Something unexpected happened!', error);
          toast.error('An unexpected error occurred.', { position: 'top-right' });
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div>
        <Navbar page='blog'/>   
    </div>
  )
}

export default AddNewBlog
