import Post from "@/models/post";
import { connectToDb } from "@/utils/database";

type ParamProps = {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }

export const GET = async (req:Request, {params}:ParamProps)=>{
    try {
        await connectToDb()
        
        const post = await Post.findById(params.id).populate("creator")

        if(!post){
            return new Response("Post not found", {status: 404})
        }

        return new Response(JSON.stringify(post), {status: 200})
    } catch (error) {
        return new Response("Failet to fetch post", {status: 500})
    }
}

export const PATCH = async(req:Request, {params}:ParamProps)=>{

    const {post} = await req.json()
    try {
        await connectToDb()

        const existingPost = await Post.findById(params.id)

        if(!existingPost){
            return new Response("Post not found", {status: 404})
        }

        existingPost.post = post
        await existingPost.save()

        return new Response(JSON.stringify(existingPost), {status: 200})
    } catch (error) {
        return new Response("Failed to update", {status:500})
    }
}

export const DELETE = async(req:Request, {params}:ParamProps)=>{
    try {
        await connectToDb()
        await Post.findByIdAndDelete(params.id)

        return new Response("Post deleted", {status: 200})
    } catch (error) {
        return new Response("Failed to delete", {status: 500})
    }
}