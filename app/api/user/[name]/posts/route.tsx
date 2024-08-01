import User from "@/models/user";
import { connectToDb } from "@/utils/database";

export const GET = async (req:Request, {params}:any)=>{
    try {
      await connectToDb();

      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "10");
      const skip = (page - 1) * limit;

      if (page < 1 || limit < 1) {
        return new Response("Invalid pagination parameters", { status: 400 });
      }

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
            postCount: { $size: "$posts" }
          },
        },
        {
          $unwind: {
            path: "$posts",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },

        {
          $group: {
            _id: "$_id",
            username: { $first: "$username" },
            email: { $first: "$email" },
            image: { $first: "$image" },
            desc: { $first: "$desc" },
            posts: { $push: "$posts" },
            postCount: { $first: "$postCount" }
          },
        },
      ]);

      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch posts", {status: 500})
    }
}