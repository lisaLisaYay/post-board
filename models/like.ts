import { Schema, Types, model, models } from "mongoose";

const LikeSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        ref: "User",
        required:true
    },
    postId:{
        type: Types.ObjectId,
        ref: "Post",
        required: true
    },
    created:{
        type: Date,
        default:Date.now
    }
})

const Like = models.Like || model("Like", LikeSchema)

export default Like