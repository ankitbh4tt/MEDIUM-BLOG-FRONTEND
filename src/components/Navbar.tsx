import React from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom'

const Navbar = () => {

    

  return (
    <div className='bg-black h-12 sticky top-0'>
        <div className='flex items-center justify-between px-6'>
            <Link to={'/'} className='text-white text-2xl font-semibold'>Blogs</Link>
            <div>
                {/* <Link to={'/signin'}>
                    <IoIosLogOut className='text-white size-6 m-2' />
                </Link> */}
                <Link to={'/newBlog'}>
                    <FaPencilAlt className='text-white size-6 m-2'/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
