"use client"
import Form from "@/components/Form"
import { useEffect, useState } from "react";
import { useParams, useRouter} from "next/navigation";

const EditPostForm =()=>{
  const [post, setPost] = useState("");
  const [user, setUser] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const postId = useParams().id
  const router = useRouter()

  const handleUpdate = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true)
        try {
            const res = await fetch(`/api/post/${postId}`,{
                method: "PATCH",
                body: JSON.stringify({post})
            })

            if(res.ok){
                router.back()
            }
        } catch (error) {
            console.log(error);
    }finally{
        setSubmitting(false)
    }
  };

  useEffect(()=>{
    const getPost = async()=>{
        const response = await fetch(`/api/post/${postId}`)
        const data = await response.json()
        
        setPost(data.post)
        setUser(data.creator.username)
    }

    try {
        if(postId){
            getPost()
        }
    } catch (error) {
        console.log(error);
        
    }
  },[postId])

if(post){
    return (
      <div className="post">
        <div className=" place-self-start">
          <div className="mb-5">{user}</div>
        </div>
        <Form
          submit={handleUpdate}
          post={post}
          setPost={setPost}
          type="Update"
          status={submitting}
        />
      </div>
    );
}else {
    return <h1 className="text-center">Loading...</h1>
}
}

export default EditPostForm