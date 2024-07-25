import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";

export default function Home() {
  return (
    <section className="w-full grid place-items-center">
      <h1 className="text-5xl text-center font-bold max-w-[600px] mt-12">Create posts and see posts from other!</h1>
      <PostForm/>
      <div className="lg:grid-cols-3 md:grid-cols-2 grid grid-cols-1">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </section>
  );
}
