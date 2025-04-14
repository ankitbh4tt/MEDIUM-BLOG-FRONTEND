import React from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom'

interface NavbarProps{
    page:string
}

const Navbar:React.FC<NavbarProps> = ({page}) => {

    

  return (
    <div className='bg-gray-700 h-14 sticky top-0 z-1'>
        <div className='flex items-center justify-between px-6 pt-[6px]'>
            <Link to={'/'} className='text-white text-2xl font-semibold'>Blogs</Link>
            <div>
                {
                    page==='home'?
                        <div className='flex gap-2'>
                            <Link to={'/newBlog'} title='Click to write your thoughts.' className='flex items-center'>
                                <span className='text-white flex bg-blue-950 p-2 rounded-3xl '>
                                    New Blog
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                                </span>
                                {/* <FaPencilAlt className='text-white size-4 m-2'/> */}

                            </Link>
                            <Link to={'/logout'}>
                                <IoIosLogOut className='text-white size-6 m-2' />
                            </Link>
                        </div>
                    :
                        <Link to={'/signin'}>
                            <IoIosLogOut className='text-white size-6 m-2' />
                        </Link>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar
