import { useRouter } from "next/navigation";

interface Props {
  submit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  post: string;
  setPost: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  status: boolean;
}

const Form =({submit, post, setPost, type, status}:Props)=>{

  const router = useRouter();

  const handleClose =()=> {
    router.back();
  }

    return (

        <form className="grid w-full" onSubmit={submit}>
          <textarea
            className="rounded-md text-black min-h-36 p-2"
            onChange={(e) => setPost(e.target.value)}
            value={post}
          />
          <div className="flex justify-between mt-5">
            <button type="button" onClick={handleClose} className="form-button" disabled={status}>Close</button>
            <button className="form-button active" type="submit" disabled={status || !post}>{type}</button>
          </div>
        </form>

    );
}

export default Form