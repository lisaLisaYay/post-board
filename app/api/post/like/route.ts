import Like from "@/models/like";
import { connectToDb } from "@/utils/database";

export const POST = async(req:Request)=>{
    const {userId, postId} = await req.json()

    try {
        await connectToDb()

        const existingLike = await Like.findOne({userId, postId})

        if(!existingLike){
            const newLike = new Like({userId, postId})
            await newLike.save()
        }

        return new Response("Post liked", {status:200})
    } catch (error) {
        return new Response("failed to like", {status:500})
    }
}

export const DELETE = async(req:Request)=>{
    const {userId, postId} = await req.json()

    try {
        await connectToDb()
        const deletedLike = await Like.findOneAndDelete({userId, postId})

        if(deletedLike){
            return new Response("Post unliked", {status:200})
        } else {
            return new Response("Like not found", {status:404})
        }
    } catch (error) {
        return new Response("Failed to unlike", {status:500})
    }
}