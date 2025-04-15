import React from 'react'


interface Blog{
    blogId:string,
    title:string,
    content:string,
    published:boolean,
  }

const BlogPage:React.FC<Blog> = ({ title, content, blogId, published }) => {
  return (
    <div>
      {title}{content}{blogId}{published}
    </div>
  )
}

export default BlogPage
