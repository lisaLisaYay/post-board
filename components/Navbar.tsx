"use client"
import { useSession, signIn, signOut, getProviders, LiteralUnion,ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useEffect, useState } from "react";

const Navbar = ()=>{

  const {data: session} = useSession()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)

  useEffect(()=>{
    const setUpProviders = async ()=>{
      const res = await getProviders()
      setProviders(res)
    }

    setUpProviders()
  },[])

    return (
      <nav className="w-full py-1 px-5 flex justify-between fixed">
        <div className="">
          {session?.user?
          <p>{session.user.name}</p>:
          <p>logo</p>}
        </div>
        <div>
          {providers && 
          Object.values(providers).map((provider)=>{
            return (
              <button className="btn" key={provider.name} onClick={()=>signIn(provider.id)}>Sign In</button>
            )
          })}
          {session?.user && <button className="btn" onClick={()=>signOut()}>Sign Out</button>}
          
        </div>
      </nav>
    );
}

export default Navbar