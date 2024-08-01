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

const CardList =({data, handleDelete}:{ data: Posts | undefined, handleDelete:(post: string)=>void })=>{
  
  return (
    <div className="grid place-items-center w-full">
      {data?.map((item:Post) => (
        <PostCard 
        key={item._id}
        username={item.creator.username}
        userId={item.creator._id}
        image={item.creator.image}
        post={item.post}
        postId={item._id}
        handleDelete={handleDelete} />
      ))}
    </div>
  );
}

const Feed =()=>{

  const [posts, setPosts] = useState<Posts | undefined>()

  const handleDelete = async(postId:string)=>{
    try {
      await fetch(`/api/post/${postId.toString()}`,{
        method: "DELETE"
      })

      const filteredPosts = posts?.filter((item)=>item._id !==postId)
      setPosts(filteredPosts)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res =await fetch("api/post")
      const data = await res.json()

      setPosts(data)
    }

    fetchPosts()
  },[])
    return (
      <section className="w-full flex justify-center">
        <CardList data={posts} handleDelete={handleDelete}/>
      </section>
    );
}

export default Feed