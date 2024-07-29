import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Post {
  creator: {
    image:string,
    username:string,
    _id:string
  };
  likedBy: [];
  post: string;
  __v: string;
  _id: string;
}

const PostCard = ({post, handleDelete}:{post:Post, handleDelete:(post:Post)=>void}) => {

  const {data:session} = useSession()


  return (
    <article className="m-2 w-[320px] p-3 rounded-md border border-slate-800 shadow-sm">
        <div className="flex mr-3">
          <Image src={`${post?.creator.image}`} alt="post-icon" height={30} width={30} className=" rounded-full"/>
          <p className="ml-2">{post.creator.username}</p>
        </div>
        <p>
          {post.post}
        </p>
      {session?.user?.id===post.creator._id &&<div className="w-full flex justify-end pr-3 mt-2">
        <Link className="text-slate-500" href={`/edit-post/${post._id}`}>edit</Link>
        <button className="text-slate-500 ml-5" onClick={()=>handleDelete(post)}>delete</button>
      </div>}
    </article>
  );
};

export default PostCard;
