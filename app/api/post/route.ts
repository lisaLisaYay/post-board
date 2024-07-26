import { connectToDb } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (res:Response)=>{
    try {
        await connectToDb()

        const posts = await Post.find({}).populate("creator")

        return new Response(JSON.stringify(posts), {status:200})
    } catch (error) {
        return new Response("Failed to fetch", {status:500})
    }
}