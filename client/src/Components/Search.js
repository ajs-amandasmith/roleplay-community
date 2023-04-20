import React, { useState } from "react";

function Search({ setDoSearch, allPosts, allTags, setSearchTag, setSearchTagId }) {

  // console.log(allPosts)
  // console.log(allTags)

  const displayTags = allTags.map(tag => (
    <option key={tag.id} id={tag.id}>{tag.tag.replace(/-/g, ' ')}</option>
))

  return (
    <div className="div-welcome">
      <form>
      <label htmlFor="post-tag">Select Category: </label>
        <select 
          id="post-tag" 
          name="post-tag" 
          className="capitalize"
          onChange={e => {
            setSearchTagId(parseInt((e.target[e.target.selectedIndex].id))) 
            setSearchTag(e.target.value)
          }} 
          defaultValue="Select a Category">
          <option disabled="disabled">Select a Category</option>
          {displayTags}
        </select>  
      </form>
    </div>
  )
}

export default Search;
