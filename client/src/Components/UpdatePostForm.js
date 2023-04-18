import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function UpdatePostForm({ currentPost, updatePost, title, setTitle, setEditPost }) {
  const [postContent, setPostContent] = useState(currentPost.post);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/posts/${currentPost.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        post: postContent
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(post => {
            dispatch({ type: "posts/update", payload: post})
            updatePost(post);
            setEditPost(false);
          })
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }
  
  return (
    <div className="div-welcome w-1/2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="update-title">Update Title: </label>
        <input 
          id="update-title" 
          type="text" 
          className="border" 
          value={title}
          onChange={e => setTitle(e.target.value)} 
        />
        <br></br>
        <label htmlFor="post">Update Post: </label>
        <textarea
          className="border"
          id="post"
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
        <br></br>
        <button type="submit" className="btn-confirm">Submit</button>
      </form>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default UpdatePostForm;