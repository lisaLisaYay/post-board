import Post from "@/models/post";
import { connectToDb } from "@/utils/database";

export const GET = async (req:Request, {params}:any)=>{
    try {
        await connectToDb()

        const posts = (await Post.find({creator:params.id}).populate("creator"))

        return new Response(JSON.stringify(posts.reverse()), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch posts", {status: 500})
    }
}