import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Post {
  creator: {
    image:string,
    username:string,
    _id:string
  };
  isLiked: boolean;
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
        isLiked={item.isLiked}
        handleDelete={handleDelete} />
      ))}
    </div>
  );
}

const Feed =()=>{

  const [posts, setPosts] = useState<Posts | undefined>()
  const { data: session } = useSession();

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
      console.log(session?.user?.id);
      
      const res =await fetch(`api/post?userId=${session?.user?.id}`)
      const data = await res.json()

      console.log(data);
      

      setPosts(data)
    }

    fetchPosts()
  },[session?.user?.id])
    return (
      <section className="w-full flex justify-center">
        <CardList data={posts} handleDelete={handleDelete}/>
      </section>
    );
}

export default Feed