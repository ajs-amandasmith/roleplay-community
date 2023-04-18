import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function UpdatePostForm({ currentPost, updatePost, title, setTitle }) {
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
          })
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }
  
  return (
    <div>
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
        <button type="submit" className="border-slate-400 bg-slate-200">Submit</button>
      </form>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default UpdatePostForm;