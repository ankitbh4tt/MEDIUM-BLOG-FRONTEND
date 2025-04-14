import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URI } from '../config/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Blog from './Blog'
import BlogCard from '../components/BlogCard'
import Navbar from '../components/Navbar'
import AllBlogsSkeleton from '../components/AllBlogsSkeleton'



interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string; // Adjust based on your DB column name
  author?: {
    id: string;
    email: string;
    name: string;
    password: string;
  };
}

const Blogs = () => {

  const [blogs,setBlogs] = useState<Blog[]>([])
  const [loading,setLoading] = useState(true)

  const navigate = useNavigate()
  const fetchAndRenderBlogs = async()=>{
    if(sessionStorage.getItem('token')){
      try {
        const result = await axios.get(`${BACKEND_URI}blog/bulk`,{
          headers:{
            Authorization:sessionStorage.getItem('token')
          }
        })
        const data = await result.data
        setBlogs(data.blogs)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }else{
      toast.error("Please Sign in to explore !",{
        "position":"top-right"
      })
      navigate('/signin');
    }
  } 

  useEffect(()=>{
    fetchAndRenderBlogs()
  },[])

  
  return (
    <div>
      <Navbar page={'home'}/>
      <div >
        {loading?
          <div>
            <AllBlogsSkeleton/>

          </div>
        :
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {blogs.map((blog)=>(
                <BlogCard title={blog.title} content={blog.content} blogid={blog.id} published={blog.published} author={blog.authorId} key={blog.id}/>
            ))}
          </div>
        }
      </div>

    </div>
  )
}

export default Blogs
