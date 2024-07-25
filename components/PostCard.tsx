
// name, image, post, edit, delete
const PostCard = ({}) => {
  return (
    <article className="m-2 max-w-[320px] p-3 rounded-md border border-slate-800 shadow-sm">
        <div className="flex mr-3">
          <div>i</div>
          <p>Name</p>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim,
          necessitatibus harum nisi maiores asperiores exercitationem tempora
          iure! Aliquam, odit voluptas?
        </p>
      <div className="w-full flex justify-end pr-3 mt-2">
        <button className="text-slate-500" >edit</button>
        <button className="text-slate-500 ml-5">delete</button>
      </div>
    </article>
  );
};

export default PostCard;
