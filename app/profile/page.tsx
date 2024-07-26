"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile =()=>{
  const {data: session} = useSession()

    return (
      <section className="w-full grid place-items-center">
        {session?.user ? (
          <div>
            <Image
              src={`${session.user.image}`}
              alt="icon"
              height={100}
              width={100}
            />
            <div>{session.user.name}</div>
            <div>description</div>
          </div>
        ) : (
          <div>sign in</div>
        )}
      </section>
    );
}

export default Profile;