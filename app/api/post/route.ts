import { connectToDb } from "@/utils/database";
import Post from "@/models/post";
import mongoose from "mongoose";

export const GET = async (req:Request)=>{

    try {
        await connectToDb()

        const url = new URL(req.url);
        const userId = url.searchParams.get('userId')

        let pipeline;

        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            const userObjectId = new mongoose.Types.ObjectId(userId);

            pipeline = [
                {
                    $lookup: {
                        from: "likes",
                        let: { postId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$postId", "$$postId"] }
                                }
                            },
                            {
                                $match: {
                                    userId: userObjectId
                                }
                            }
                        ],
                        as: "userLikes"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "creator",
                        foreignField: "_id",
                        as: "creator"
                    }
                },
                {
                    $unwind: "$creator"
                },
                {
                    $addFields: {
                        isLiked: {
                            $gt: [{ $size: "$userLikes" }, 0]
                        }
                    }
                },
                {
                    $project: {
                        userLikes: 0
                    }
                }
            ];
        } else {
            pipeline = [
                {
                    $lookup: {
                        from: "users",
                        localField: "creator",
                        foreignField: "_id",
                        as: "creator"
                    }
                },
                {
                    $unwind: "$creator"
                },
                {
                    $addFields: {
                        isLiked: false
                    }
                }
            ];
        }
        const posts = await Post.aggregate(pipeline)

        return new Response(JSON.stringify(posts), {status:200})
    } catch (error) {
        return new Response("Failed to fetch", {status:500})
    }
}