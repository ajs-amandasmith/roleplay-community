import React, { useState } from 'react';

function AddTagForm({ currentPost, availableTags, updatePostTags }) {
  const [currentTagId, setCurrentTagId] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState([]);

  const displayTags = availableTags.map(tag => (
      <option key={tag.id} id={tag.id}>{tag.tag}</option>
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
            console.log(postTag)
          })
          
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select 
          id="post-tag" 
          name="post-tag" 
          onChange={e => {
            setCurrentTagId(parseInt((e.target[e.target.selectedIndex].id))) 
            setCurrentTag(e.target.value)
          }} 
          defaultValue="Select a Tag"
          // onChange={e => setCurrentTag(e.target.value)}
        >
          <option disabled="disabled">Select a Tag</option>
          {displayTags}
        </select>        
        <button type="submit" className="border-slate-400 bg-slate-200">Submit</button>
      </form>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default AddTagForm;