import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddPostForm({ updateAllPosts, setAddPost, setPostCreated, allTags }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.user.user);
  const characters = useSelector(state => state.characters);
  const [currentTagId, setCurrentTagId] = useState("");

  const characterOptions = characters.map(character => (
    <option key={character.id} id={character.id}>{character.name}</option>
  ))

  const displayTags = allTags.map(tag => (
    <option key={tag.id} id={tag.id}>{tag.tag.replace(/-/g, ' ')}</option>
  ))

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        post: post,
        character_id: characterId,
        user_id: user.id,
        tag_ids: [currentTagId]
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(post => {
            console.log("post", post)
            setAddPost(false);
            dispatch({ type: "posts/add", payload: post })
            updateAllPosts(post, "add");
            setPostCreated(true);
          })
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }

  return (
    <>
    {characters.length === 0 ? <h2 className="text-rose-500">Please create a character</h2>:
      <div className="div-welcome">
        <h2 className="text-white mb-4 ">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="title">Title: </label> */}
          <input 
            type="text"
            className="ml-2"
            placeholder="Title"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br></br>
          {/* <label htmlFor="characters">Select a Character: </label> */}
          <select 
            id="characters" 
            name="characters" 
            className="ml-2"
            onChange={e => setCharacterId(parseInt(e.target[e.target.selectedIndex].id))} 
            defaultValue="Select Your Character"
          >
            <option disabled="disabled">Select Your Character</option>
            {characterOptions}
          </select>
          <br></br>
          {/* <label htmlFor="post-tag">Select Tag: </label> */}
          <select 
          id="post-tag" 
          name="post-tag" 
          className="capitalize ml-2"
          onChange={e => {
            setCurrentTagId(parseInt((e.target[e.target.selectedIndex].id))) 
          }} 
          defaultValue="Select a Tag">
          <option disabled="disabled">Select a Tag</option>
          {displayTags}
          </select> 
          <br></br>
          {/* <label htmlFor="post">Post: </label> */}
          <textarea
            id="post"
            className="ml-2"
            placeholder="Post..."
            value={post}
            onChange={e => setPost(e.target.value)}
          />
          <br></br>
          <button type="submit" className="btn-confirm">Submit</button>
        </form>
        {errors.map(err => (
            <p key={err} className="text-red-600">{err}</p>
          ))}
      </div>
    }
    </>
  )
}

export default AddPostForm;