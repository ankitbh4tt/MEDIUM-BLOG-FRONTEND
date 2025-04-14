import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './rte.css'
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { BACKEND_URI } from '../../config/api';
import { data, useNavigate } from 'react-router-dom';
 

interface ServerError {
  message:string
}

const RTE = () => {
  const [content, setContent] = useState('');
  const [title,setTitle]  = useState('')
 

  const navigate = useNavigate()
  const handleSubmitNewBlog = async()=>{
    if(!sessionStorage.getItem('token')){
      toast.error("You are logged out! Please login again to proceed",{position:"top-right",autoClose:10})
      localStorage.setItem('lastPage','/newBlog')
        navigate('/')
      return;
    }
    if(!title || title===''){
      toast.error("Please give title to your thought.",{position:"top-right"})
      return
    }
    console.log(content)
    if(!content || content==='<p><br></p>'){
      toast.error("Please write your thought.",{position:"top-right"})
      return
    }
    const formData = {
      title,
      content
    }
    try {
      const response = await axios.post(`${BACKEND_URI}blog`,formData,{headers:{
        'Authorization':sessionStorage.getItem('token')
      }})
      const data = response.data.id
      setTitle('')
      setContent('')
      toast.success("Blog Posted Successfully",{position:"top-right"})
    } catch (error) {
      const axiosError = error as AxiosError<ServerError>
      if(axios.isAxiosError(axiosError)){
        console.error(axiosError.response?.data?.message)
        toast.error(axiosError.response?.data?.message,{position:'top-right'})
      }else{
        toast.error("Something unexpected happened!",{position:'top-right'})
        console.error(error)
      }
    }
  }

  // Basic toolbar with minimal features
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className='mb-2 font-bold flex justify-center'>Publish your thoughts</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
      <div className="mb-4">
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          modules={modules}
          className="bg-white rounded-lg shadow-sm border border-gray-300"
          placeholder="Write your blog post..."
        />
      </div>
      <button
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
        onClick={handleSubmitNewBlog} // Replace with your submit logic
      >
        Post Blog
      </button>
    </div>
  );
};

export default RTE;