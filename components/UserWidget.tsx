import Image from "next/image"
import Link from "next/link"

const UserWidget =({userImage, userName}:{userImage:string, userName:string})=>{
    return(
        <Link href={`/profile/${userName}?page=1`} className="flex relative items-center my-2">
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