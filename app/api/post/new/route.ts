import { connectToDb } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (req:Request) => {
    const {userId, post} = await req.json()

    try {
        await connectToDb()
        const newPost = new Post({creator:userId, post, likedBy:[]})

        await newPost.save()

        return new Response(JSON.stringify(newPost), {status: 200})
    } catch (error) {
        return new Response("Failed to send post")
    }
}