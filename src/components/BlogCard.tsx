import axios,{AxiosError} from "axios";
import React from "react";
import { BACKEND_URI } from "../config/api";

interface BlogCardProps {
  title: string;
  content: string;
  blogid: string;
  published: boolean;
  author: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author?: {
    id: string;
    email: string;
    name: string;
    password: string;
  };
}

interface ServerError {
  message: string;
  code?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, content, blogid, published, author }) => {
  const [detailedBlog, setDetailedBlog] = React.useState<Blog | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleBlogCardClick = async (blogid: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await axios.get(`${BACKEND_URI}blog/${blogid}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const blog = response.data?.blog || response.data; // Handle both {blog: {...}} and {...}
      if (!blog) {
        setError("Blog not found in response");
        return;
      }
      setDetailedBlog(blog);
      console.log("Detailed blog:", blog);
    } catch (err) {
      const axiosError = err as AxiosError<ServerError>;
      if(axios.isAxiosError(axiosError)){
        if(axiosError.response){
          const serverMessage = axiosError.response.data?.message || axiosError.message
          setError(serverMessage)
        }
      }else{
        setError('An unexpected error occurred');
      }
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow" onClick={() => handleBlogCardClick(blogid)}>
      <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          className="h-56 w-full object-cover"
        />

        <div className="bg-white p-4 sm:p-6">
          <time dateTime="2022-10-10" className="block text-xs text-gray-500"> {published} </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg text-gray-900">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {content}
          </p>
          <p className="text-xs text-gray-400 flex justify-end">SomeoneYouKnow</p>

        </div>
      </article>



      {error && <p className="text-red-500 text-sm">{error}</p>}
      {detailedBlog && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          <h4 className="font-semibold">Detailed View:</h4>
          <p><strong>Title:</strong> {detailedBlog.title}</p>
          <p><strong>Content:</strong> {detailedBlog.content}</p>
          <p><strong>Published:</strong> {detailedBlog.published ? "Yes" : "No"}</p>
          <p><strong>Author ID:</strong> {detailedBlog.authorId}</p>
        </div>
      )}
    </div>
  );
};

export default BlogCard;