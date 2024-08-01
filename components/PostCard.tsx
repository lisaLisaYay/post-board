import { useSession } from "next-auth/react";
import Link from "next/link";
import UserWidget from "./UserWidget";

interface Props {
  post: string;
  username: string;
  image: string;
  userId: string;
  postId: string;
  handleDelete: (post: string) => void;
}

const PostCard = ({post, username, image, userId, postId, handleDelete}:Props) => {

  const {data:session} = useSession()

  return (
    <article className="m-2 w-[320px] p-3 rounded-md border border-slate-800 shadow-sm">
      <UserWidget userImage={image} userName={username}/>
        <p>
          {post}
        </p>
      {session?.user?.id===userId &&<div className="w-full flex justify-end pr-3 mt-2">
        <Link className="text-slate-500" href={`/edit-post/${postId}`}>edit</Link>
        <button className="text-slate-500 ml-5" onClick={()=>handleDelete(postId)}>delete</button>
      </div>}
    </article>
  );
};

export default PostCard;
