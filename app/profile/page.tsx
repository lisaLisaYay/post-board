"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

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

type Posts = Post[]

const Profile =()=>{
  const [posts, setPosts] = useState<Posts | undefined>()
  const {data: session} = useSession()

  const handleDelete = async(post:Post)=>{
    try {
      await fetch(`/api/post/${post._id.toString()}`,{
        method: "DELETE"
      })

      const filteredPosts = posts?.filter((item)=>item._id !==post._id)
      setPosts(filteredPosts)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    const getPosts = async ()=>{
      const res = await fetch(`api/users/${session?.user?.id}/posts`)
      const data = await res.json()
      setPosts(data)
    }

    if(session){
      try {
        getPosts()
      } catch (error) {
        console.log(error);
      }
    }
  },[session])

    return (
      <section className="w-full grid place-items-center">
        {session?.user ? (
          <div>
            <Image
              src={`${session.user.image}`}
              alt="icon"
              height={100}
              width={100}
            />
            <div>{session.user.name}</div>
            <div>description</div>
            <div>{posts?.map((item)=><PostCard key={item._id} post={item} handleDelete={handleDelete}/>)}</div>
          </div>
        ) : (
          <div>sign in</div>
        )}
      </section>
    );
}

export default Profile;