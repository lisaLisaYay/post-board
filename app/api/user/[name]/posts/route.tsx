import User from "@/models/user";
import { connectToDb } from "@/utils/database";
import mongoose from "mongoose";

export const GET = async (req:Request, {params}:any)=>{
    try {
      await connectToDb();

      //const posts = (await Post.find({creator:params.id}).populate("creator"))

      const user = await User.aggregate([
        {
          $match: { username: params.name },
        },
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "creator",
            as: "posts",
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            image: 1,
            desc: 1,
            posts: {
              $reverseArray: "$posts",
            },
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            image: 1,
            desc: 1,
            posts: {
              _id: 1,
              post: 1,
            },
          },
        },
      ]);

      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch posts", {status: 500})
    }
}