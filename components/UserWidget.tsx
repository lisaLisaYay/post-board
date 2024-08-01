import Image from "next/image"
import Link from "next/link"

const UserWidget =({userImage, userName}:{userImage:string| undefined | null, userName:string| undefined | null})=>{
    return(
        <Link href={`/profile/${userName}?page=1`} className="flex relative items-center my-2 w-fit">
        <Image
          src={`${userImage}`}
          alt="icon"
          height={38}
          width={38}
          className="rounded-md mr-3"
        />
        <p className=" font-semibold text-sm tracking-wide text-white">{userName}</p>
      </Link>
    )
}
export default UserWidget