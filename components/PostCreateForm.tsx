"use client"
import Form from "@/components/Form"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePostForm =()=>{
    const [post, setPost] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const {data:session} = useSession()
    const router = useRouter();

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault(); 
        setSubmitting(true)
        
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
        } finally{
            router.back();
        }
      }

if(session?.user){
  return (
    <div className="post">
      <div className=" place-self-start">
        <div className="mb-5">{session?.user?.name}</div>
      </div>
      <Form submit={handleSubmit} post={post} setPost={setPost} type="Post now" status={submitting}/>
    </div>
  );
} else {
  return (
    <div>login</div>
  )
}
}

export default CreatePostForm