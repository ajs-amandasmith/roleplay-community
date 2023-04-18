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
    return <Redirect to="/" />
  }

  return (
    <>
      <button className="btn-cancel place-self-center mt-10" onClick={handleDelete}>Delete Post?</button>
    </>
  )
}

export default DeletePost;