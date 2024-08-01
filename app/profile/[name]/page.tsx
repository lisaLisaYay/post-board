"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import PostCard from "@/components/PostCard";
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
    desc:string,
    postCount: number
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

    if(profile) {
      const maxPage = Math.ceil(profile.postCount / 10)
      if(newPage > 0 && maxPage>=newPage){
        router.push(`/profile/${params.name}?page=${newPage}`)
      }
    }
  }

  const handleDelete = async(postId:string)=>{
    try {
      await fetch(`/api/post/${postId.toString()}`,{
        method: "DELETE"
      })

      if(profile){
        const filteredPosts = profile.posts.filter((item) => item._id !== postId);
        setProfile({ ...profile, posts: filteredPosts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    
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
        {profile ? (
          <div>
            <Image
              src={`${profile.image}`}
              alt="icon"
              height={100}
              width={100}
            />
            <div>{profile.username}</div>
            <div>About me: {profile.desc}</div>
            <div>Posts: {profile.postCount? profile.postCount: "User has no posts"}</div>
            <Link href={`/create-post`}>Create Post</Link>
            <div>
              {profile.posts.map((item) => (
                <PostCard
                  key={item._id}
                  username={profile.username}
                  userId={profile._id}
                  image={profile.image}
                  post={item.post}
                  postId={item._id}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
            {profile.postCount>10 &&
            <div className="w-full flex justify-around">
              <button className="btn" onClick={() => handlePageChange(pageFromParams - 1)}>previous</button>
              <button className="btn"onClick={() => handlePageChange(pageFromParams + 1)}>next</button>
            </div>}
          </div>
        ) : (
          <div>loading</div>
        )}
      </section>
    );
}

export default Profile;