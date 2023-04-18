import React, { useState } from "react";
import { useDispatch } from "react-redux";

function AddPostImage({ currentPost, updatePost, setEditPost }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [postImage, setPostImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append('image', postImage);
    fetch(`/posts/${currentPost.id}`, {
      method: "PATCH",
      body: formData
    })
      .then(r => {
        if (r.ok) {
          r.json().then(post => {
            dispatch({ type: "posts/image/add", payload: post});
            updatePost(post);
            setEditPost(false);
          })
        } else {
          r.json().then(err => setError(err.error))
        }
      })
  }

  return (
    <div className="div-welcome w-1/2">
      <form onSubmit={handleSubmit}>
      <label htmlFor="post-image">Update Image: </label>
        <input id="post-image" type="file" accept="image" className="border" onChange={e => setPostImage(e.target.files[0])}></input>
        <button type="submit" className="btn-confirm">Submit Image</button>
      </form>
      {error === "Internal Server Error" ? <p className="text-red-600">No file attached</p> : null }
    </div>
  )
}

export default AddPostImage;