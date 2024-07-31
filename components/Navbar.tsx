"use client"
import { useSession, signIn, signOut, getProviders, LiteralUnion,ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = ()=>{

  const {data: session} = useSession()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    const setUpProviders = async ()=>{
      const res = await getProviders()
      
      setProviders(res)
    }
    
    setUpProviders()
  },[])

    return (
      <nav className="w-full py-2 px-5 flex justify-between fixed">
        <div className="">
          <Link href="/"  onClick={()=>setOpen(false)}>Logo</Link>
        </div>
        <div>
          {session?.user ? (
            <div className="flex gap-4">
              <button className="flex relative items-center" onClick={()=>setOpen((prev)=>!prev)}>
                <Image
                  src={`${session?.user.image}`}
                  alt="icon"
                  height={38}
                  width={38}
                  className="rounded-full mr-2"
                />
                <p>{session?.user.name} &#9662;</p>
              </button>
              {open&&<div className="grid absolute right-1 top-14 bg-slate-800 w-48">
                <Link href={`/profile/${session.user.name}`} className="py-1 hover:bg-slate-100 hover:text-black justify-center flex" onClick={()=>setOpen(false)}>Profile</Link>
                <button className="py-1 hover:bg-slate-100 hover:text-black" onClick={() => signOut()}>
                  Log Out
                </button>
              </div>}
            </div>
          ) : (
            <div>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <button
                      className="btn"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                    >
                      Sign In with {provider.name}
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </nav>
    );
}

export default Navbar