"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfilePostCard from "@/components/ProfilePostCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams  } from "next/navigation";

interface Post {
  post: string;
  _id: string;
}

interface Props {
    image:string,
    username:string,
    _id:string,
    email:string,
    posts: Post[] | [],
    desc:string
}

type ParamProps = {
  params: { name: string };
}

const Profile =({params}:ParamProps)=>{
  const [profile, setProfile] = useState<Props | null>()

  const {data: session} = useSession()
  const router = useRouter()
  const searchParams = useSearchParams();

  const pageFromParams = parseInt(searchParams.get('page') || '1', 10);  

  const handlePageChange =(newPage:number)=>{
    if(newPage > 0){
      router.push(`/profile/${params.name}?page=${newPage}`)
    }
  }

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

    if(profile){
      setProfile({...profile, posts:[]})
    }
    const getPosts = async ()=>{
      const res = await fetch(`/api/user/${params.name}/posts?page=${pageFromParams}&limit=10`)
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
  },[session, searchParams])

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
            <button onClick={()=>handlePageChange(pageFromParams-1)}>previous page</button>
            {profile.posts &&<p>{pageFromParams}</p>}
            <button onClick={()=>handlePageChange(pageFromParams+1)}> next page</button>
          </div>
        ) : (
          <div>loading</div>
        )}
      </section>
    );
}

export default Profile;