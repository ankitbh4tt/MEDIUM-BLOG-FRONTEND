import axios,{AxiosError} from "axios";
import React from "react";
import { BACKEND_URI } from "../config/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  const handleBlogCardClick = async (blogid: string) => {
    navigate('/blog/'+blogid)
  };

  return (
    <div className="bg-blue-50 p-4 rounded shadow cursor-pointer" onClick={() => handleBlogCardClick(blogid)}>
      <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-2xl">
        <div className="bg-white p-4 sm:p-6">

          <a href="#" className="flex gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div  className="block">
             {published?
                <span className="text-green-500 text-3xl">&#183;</span>
              :
                <div className="text-3xl text-gray-500">&#183;</div>
             } 
          </div>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {content.slice(0,120)}...
          </p>
          <p className="text-xs text-gray-400 flex justify-end">SomeoneYouKnow</p>

        </div>
      </article>
    </div>
  );
};

export default BlogCard;