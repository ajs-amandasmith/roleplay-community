import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

function DeletePost({ currentPost, updateAllPosts }) {
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDelete() {
    setIsDeleted(false);
    fetch(`/posts/${currentPost.id}`, {
      method: "DELETE"
    })
      dispatch({ type: "posts/remove", payload: currentPost })
      setIsDeleted(true);
      updateAllPosts(currentPost, "delete")
  }

  if (isDeleted) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <button className="border-slate-400 bg-slate-200" onClick={handleDelete}>Delete Post?</button>
    </div>
  )
}

export default DeletePost;