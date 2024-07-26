"use client"
import Feed from "@/components/Feed";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {

  const [post, setPost] = useState("")

  const {data:session} = useSession()

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault(); 
    console.log(post);
    
    try {
      const req = await fetch("/api/post/new", {
        method:"POST",
        body:JSON.stringify({
          userId: session?.user?.id,
          post:post
        })
      })
      setPost("")
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = ()=>{}

  const handleDelete = () =>{}

  useEffect(()=>{

  },[])
  return (
    <section className="w-full grid place-items-center">
      <h1 className="text-5xl text-center font-bold max-w-[600px] mt-12">Create posts and see posts from other!</h1>
      <form className="my-10 grid w-1/2 min-w-[320px]" onSubmit={handleSubmit}>
        <textarea className="rounded-md text-black" onChange={(e)=>setPost(e.target.value)} value={post}/>
        <div className="mt-3 flex justify-end">
          <button className="btn">Upload</button>
        </div>
      </form>
      <Feed/>
    </section>
  );
}
