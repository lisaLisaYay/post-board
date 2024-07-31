import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { connectToDb } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret:  process.env.AUTH_GOOGLE_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret:  process.env.AUTH_GITHUB_SECRET as string
        })
    ],
    callbacks:{
        async session({session}){
            if(session.user!== undefined){
                const sessionUser = await User.findOne({
                    email: session.user.email
                })

                session.user.id = sessionUser._id.toString();
            }

            return session
        },

        async signIn({profile}){
            try {
                await connectToDb()
                const userExists = await User.findOne({
                    email: profile?.email
                })

                if(!userExists){
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "_") || profile?.login,
                        desc: "I'm just a user",
                        image:profile?.picture || profile?.avatar_url
                    })
                }

                return true
            } catch (error) {
                console.log(error);
                
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}