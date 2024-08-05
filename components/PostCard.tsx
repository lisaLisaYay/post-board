import { useSession } from "next-auth/react";
import Link from "next/link";
import UserWidget from "./UserWidget";
import { useState, useEffect } from "react";

interface Props {
  post: string;
  username: string;
  image: string;
  userId: string;
  postId: string;
  linkParam:number;
  isLiked:boolean
  handleDelete: (post: string) => void;
}

const PostCard = ({post, username, image, userId, postId, linkParam, isLiked, handleDelete}:Props) => {

  const {data:session} = useSession()
  const [liked, setLiked] = useState<boolean>();

  const handleLike = async ()=>{
    const method = liked ? "DELETE" : "POST";
    try {
      const res = await fetch("/api/post/like", {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          postId
        })
      })
      
      if(res.ok){
        setLiked(!liked)
      }
    } catch (error) {
      console.log(error);
  }}

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <article className="m-2 sm:w-[500px] max-w-[500px] w-full p-3 sm:rounded-md post">
      <UserWidget userImage={image} userName={username}/>
        <p>
          {post}
        </p>
      {session?.user?.id===userId &&<div className="w-full flex justify-end pr-3 mt-2">
        <button className={`post-btn ${liked?" bg-red-600":""}`} onClick={handleLike}>like</button>
        <Link scroll={false} className="post-btn font-medium ml-5" href={`/edit-post/${postId}?page=${linkParam}`}>edit</Link>
        <button className="post-btn font-medium ml-5" onClick={()=>handleDelete(postId)}>delete</button>
      </div>}
    </article>
  );
};

export default PostCard;
