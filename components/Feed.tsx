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

const CardList =({data, handleDelete}:{ data: Posts | undefined, handleDelete:(post: Post)=>void })=>{
  
  return (
    <div className="lg:grid-cols-3 md:grid-cols-2 grid grid-cols-1">
      {data?.map((item:Post) => (
        <PostCard 
        key={item._id}
        post={item}
        handleDelete={handleDelete} />
      ))}
    </div>
  );
}

const Feed =()=>{

  const [posts, setPosts] = useState<Posts | undefined>()

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
    const fetchPosts = async ()=>{
      const res =await fetch("api/post")
      const data = await res.json()

      setPosts(data)
    }

    fetchPosts()
  },[])
    return (
      <section>
        <CardList data={posts} handleDelete={handleDelete}/>
      </section>
    );
}

export default Feed