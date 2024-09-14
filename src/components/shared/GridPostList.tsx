import { useUserContext } from "@/context/AuthContext"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats";

// import React from 'react'
type GridPostListProps = {
  posts:Models.Document[];
  ShowUser?:boolean;
  ShowStats?:boolean
}
const GridPostList = ({posts,ShowUser = true,ShowStats = true}:GridPostListProps) => {

  const {user} = useUserContext();
  return (
    <ul className="grid-container">
      {posts.map((post)=>(
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="object-cover w-full h-full"
            />
          </Link>

          <div className="grid-post_user">
            {ShowUser && (
              <div className="flex items-center justify-start flex-1 gap-2">
                <img 
                  src={post.creator.imageUrl}
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>   
            )}
            {ShowStats && (
              <PostStats post={post} userId={user.id}/>
            )
            }
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList
