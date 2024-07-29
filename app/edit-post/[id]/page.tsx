import EditPostForm from "@/components/PostEditForm"

const EditPost = async()=>{
    return (
      <div className="grid place-items-center">
        <div className="max-w-[600px] min-w-[400px] w-1/2">
          <EditPostForm />
        </div>
      </div>
    );
}

export default EditPost