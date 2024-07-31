import User from "@/models/user";
import { connectToDb } from "@/utils/database";

type ParamProps = {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }

export const GET = async(req:Request, {params}:ParamProps)=>{
    try {
        await connectToDb()
        const user = await User.findById(params.id)

        if(!user){
            return new Response("User not found", {status:404})
        }

        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch user", {status:500})
    }
}