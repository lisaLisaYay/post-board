import { useRouter } from "next/navigation";
import UserWidget from "./UserWidget";

interface Props {
  submit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  post: string;
  setPost: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  status: boolean;
  userName:string | undefined | null,
  userImage:string | undefined | null
}

const Form =({submit, post, setPost, type, userName, userImage, status}:Props)=>{

  const router = useRouter();

  const handleClose =()=> {
    router.back();
  }

    return (
      <form className="grid w-full" onSubmit={submit}>
        <UserWidget userImage={userImage} userName={userName} />
        <textarea
          className="rounded-md text-black min-h-36"
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
        <div className="flex justify-between mt-5">
          <button
            type="button"
            onClick={handleClose}
            className="form-button"
            disabled={status}
          >
            Close
          </button>
          <button
            className="form-button active"
            type="submit"
            disabled={status || !post}
          >
            {type}
          </button>
        </div>
      </form>
    );
}

export default Form