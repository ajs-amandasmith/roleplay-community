import React, { useState } from 'react';

function AddTagForm({ currentPost, allTags, tags, availableTags }) {
  const [currentTagId, setCurrentTagId] = useState("");

  console.log(availableTags)

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
          r.json().then(postTag => console.log(postTag.tag_id))
          
        } else {
          r.json().then(err => console.log(err))
        }
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select id="post-tag" name="post-tag" onChange={e => setCurrentTagId(parseInt((e.target[e.target.selectedIndex].id)))} defaultValue="Select a Tag">
          <option disabled="disabled">Select a Tag</option>
          {displayTags}
        </select>        
        <button type="submit" className="border-slate-400 bg-slate-200">Submit</button>
      </form>

    </div>
  )
}

export default AddTagForm;