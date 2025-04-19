import parse from "html-react-parser"
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

interface Blog{
    blogId:string,
    title:string,
    content:string,
    published:boolean,
  }

const BlogPage:React.FC<Blog> = ({ title, content, blogId, published }) => {
  const navigate = useNavigate()
  return (
    <>
      <TiArrowBackOutline size={30} className="ml-4 mt-2 cursor-pointer" onClick={()=>navigate('/')} />
      <div className='flex justify-center bg-amber-50 mx-[20vh] p-4 rounded-lg'>
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl ">{title}</h1>
          </div>
          <div className="mt-6">
            {parse(content)}
          </div>
          <p className="text-xs text-gray-500 flex justify-end">~SomeoneYouKnow</p>  
        </div>
      </div>
    </>
  )
}
export default BlogPage
