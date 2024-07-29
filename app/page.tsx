"use client"
import Feed from "@/components/Feed";
import Form from "@/components/Form";
import Link from "next/link";

export default function Home() {

  return (
    <section className="w-full grid place-items-center">
      <h1 className="text-5xl text-center font-bold max-w-[600px] mt-12">Create posts and see posts from other!</h1>
      <Link href={`/create-post`}>create post</Link>
      <Feed/>
    </section>
  );
}
