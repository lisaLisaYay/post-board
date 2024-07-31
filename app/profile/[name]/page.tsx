"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfilePostCard from "@/components/ProfilePostCard";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  post: string;
  _id: string;
}

interface Props {
    image:string,
    username:string,
    _id:string,
    email:string,
    posts: Post[],
    desc:string
}



const Profile =({params}:any)=>{
  const [profile, setProfile] = useState<Props | null>()
  const {data: session} = useSession()

  const handleDelete = async(post:Post|null)=>{
    try {
      await fetch(`/api/post/${post?._id.toString()}`,{
        method: "DELETE"
      })

      if(profile){
        const filteredPosts = profile.posts.filter((item) => item._id !== post?._id);
        setProfile({ ...profile, posts: filteredPosts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const getPosts = async ()=>{
      const res = await fetch(`/api/user/${params.name}/posts`)
      const data = await res.json()
      
      setProfile(data[0])
      
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
        {profile? (
          <div>
            <Image
              src={`${profile.image}`}
              alt="icon"
              height={100}
              width={100}
            />
            <div>{profile.username}</div>
            <div>About me: {profile.desc}</div>
            <Link href={`/create-post`}>Create Post</Link>
            <div>{profile.posts.map((item)=><ProfilePostCard key={item._id} post={item} username={profile.username} image={profile.image} id={profile._id} handleDelete={handleDelete}/>)}</div>
          </div>
        ) : (
          <div>loading</div>
        )}
      </section>
    );
}

export default Profile;