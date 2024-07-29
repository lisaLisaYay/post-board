"use client"
import CreatePostForm from "@/components/PostCreateForm";

const CreatePost =()=>{


    return (
      <section className="grid place-items-center">
        <div className="max-w-[600px] min-w-[400px] w-1/2">
          <h1>Create a new post</h1>
          <CreatePostForm />
        </div>
      </section>
    );
}

export default CreatePost