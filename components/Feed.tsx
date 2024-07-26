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

const CardList =({data}:{ data: Posts | undefined })=>{
  console.log(data);
  
  return (
    <div className="lg:grid-cols-3 md:grid-cols-2 grid grid-cols-1">
      {data?.map((item:Post) => (
        <PostCard 
        key={item._id}
        post={item} />
      ))}
    </div>
  );
}

const Feed =()=>{

  const [posts, setPosts] = useState<Posts | undefined>()

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
        <CardList data={posts}/>
      </section>
    );
}

export default Feed