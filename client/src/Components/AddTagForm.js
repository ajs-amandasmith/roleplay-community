import React, { useState } from 'react';

function AddTagForm({ currentPost, availableTags, updatePostTags, setEditPost }) {
  const [currentTagId, setCurrentTagId] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState([]);

  const displayTags = availableTags.map(tag => (
      <option key={tag.id} id={tag.id}>{tag.tag.replace(/-/g, ' ')}</option>
  ))

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/post_tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post_id: currentPost.id,
        tag_id: currentTagId
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(postTag => {
            updatePostTags(currentTag, currentTagId);
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
        <label htmlFor="post-tag">Select Tag: </label>
        <select 
          id="post-tag" 
          name="post-tag" 
          className="capitalize"
          onChange={e => {
            setCurrentTagId(parseInt((e.target[e.target.selectedIndex].id))) 
            setCurrentTag(e.target.value)
          }} 
          defaultValue="Select a Tag"
        >
          <option disabled="disabled">Select a Tag</option>
          {displayTags}
        </select>    
        <br></br>    
        <button type="submit" className="btn-confirm">Submit</button>
      </form>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default AddTagForm;