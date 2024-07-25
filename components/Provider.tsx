"use client"
import {SessionProvider} from "next-auth/react"
import { ReactNode } from "react"
import { Session } from "next-auth"

const Provider = ({session, children}:{ children: ReactNode, session?: Session })=>{
   return( 
   <SessionProvider session={session}>
        {children}
    </SessionProvider>)
}

export default Provider