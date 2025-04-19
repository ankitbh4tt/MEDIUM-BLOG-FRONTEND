import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BACKEND_URI } from '../config/api'
import BlogCard from '../components/BlogCard'
import BlogPage from '../components/BlogPage'
import Navbar from '../components/Navbar'
import BlogSkeleton from '../components/BlogSkeleton'


interface ErrorResponse {
  error?: string; // Middleware error
  message?: string; // Route error
}


interface BlogData{
  blogId:string,
  title: string;
  content: string;
  published:boolean,
}
const Blog = () => {
  const params = useParams()
  const blogId = params.id || ''
  const [blog, setBlog] = useState<BlogData | null>(null); // Fix: Blog | null, not Blog[]
  const [loading,setLoading] = useState(false)

  const navigate =  useNavigate()

  useEffect(()=>{
    const handleFetchBlogData = async() =>{
      setLoading(true)
      console.log(blogId)
      if(!sessionStorage.getItem('token')){
        toast.error("You are logged Out! Login to view blog.",{position:"top-right"})
      }
      try {
        console.log(blogId)
        const response = await axios.get(`${BACKEND_URI}blog/${blogId}`,{
          headers:{Authorization:sessionStorage.getItem('token')}
        })
        const data = await response.data
        console.log(data)
        setBlog(data.blog)
        setLoading(false)
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        const errorMessage = error.response?.data?.message;
        const errorError = error.response?.data?.error;

        if (errorError === 'No token provided') {
          toast.info('Please log in to view this blog post', { position: 'top-right' });
          localStorage.setItem('lastPage', `/blog/${blogId}`);
          navigate('/signin');
          return;
        }

        if (error.response?.status === 404) {
          toast.error('Blog post not found', { position: 'top-right' });
        } else if (error.response?.status === 400) {
          toast.error('Invalid blog post ID', { position: 'top-right' });
        } else if (errorMessage) {
          toast.error(errorMessage, { position: 'top-right' });
        } else {
          toast.error('Failed to load blog post', { position: 'top-right' });
        }   
        navigate('/')   
      }finally{
        setLoading(false)
      }
    }
    handleFetchBlogData()
  },[blogId])
  if (loading) {
    return (
      <>
      <Navbar page={'blog'} />
      <BlogSkeleton/>
      </>
    );
  }
  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl mt-10 text-gray-800">
        <p>Blog post not found</p>
      </div>
    );
  }
  return (
    <div>
      <Navbar page={'blog'} />
      <BlogPage title={blog.title} content={blog.content} blogId={blog.blogId} published={blog.published} key={blog.blogId}/>
    </div>
  )
}

export default Blog
