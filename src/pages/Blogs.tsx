import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URI } from '../config/api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
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
          <div>
            {!blogs.length ? (
              <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
                <svg
                  className="w-16 h-16 mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg font-medium">No blogs found</p>
                <p className="text-sm mt-2">Try checking back later or create a <Link to={'/newBlog'} className='text-blue-600'>new</Link> blog!</p>
              </div>
            ) : null}   
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {blogs.map((blog)=>(
                  <BlogCard title={blog.title} content={blog.content} blogid={blog.id} published={blog.published} author={blog.authorId} key={blog.id}/>
              ))}
            </div>
          </div>
        }
      </div>

    </div>
  )
}

export default Blogs
