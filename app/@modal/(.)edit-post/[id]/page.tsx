"use client";

import Modal from "./modal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditoModal = () => {
  const router = useRouter();
  const {data:session} = useSession()

  const handleClose =()=> {
    router.back();
  }
  return (
    <Modal>
        <div>{session?.user?.name}</div>
      <div className="h-[300px]">edit</div>
      <div className="flex justify-between">
        <button onClick={handleClose} className="form-button">
          Close
        </button>
        <button className="form-button">
          Update
        </button>
      </div>
    </Modal>
  );
};

export default EditoModal;
