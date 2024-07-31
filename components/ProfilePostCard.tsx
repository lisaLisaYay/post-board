import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Post {
  post: string;
  _id: string;
}

const ProfilePostCard = ({post, handleDelete, username, image, id}:{post:Post, handleDelete:(post:Post)=>void, username:string, image:string, id:string}) => {

  const {data:session} = useSession()

  return (
    <article className="m-2 w-[320px] p-3 rounded-md border border-slate-800 shadow-sm">
        <div className="flex mr-3">
          <Image src={`${image}`} alt="post-icon" height={30} width={30} className=" rounded-full"/>
          <p className="ml-2">{username}</p>
        </div>
        <p>
          {post.post}
        </p>
      {session?.user?.id===id &&<div className="w-full flex justify-end pr-3 mt-2">
        <Link className="text-slate-500" href={`/edit-post/${post._id}`}>edit</Link>
        <button className="text-slate-500 ml-5" onClick={()=>handleDelete(post)}>delete</button>
      </div>}
    </article>
  );
};

export default ProfilePostCard;