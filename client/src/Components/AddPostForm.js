import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddPostForm({ updateAllPosts, allTags }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.user.user);
  const characters = useSelector(state => state.characters);

  const characterOptions = characters.map(character => (
    <option key={character.id} id={character.id}>{character.name}</option>
  ))

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('post', post);
    formData.append('character_id', characterId);
    formData.append('user_id', user.id);
    fetch("/posts", {
      method: "POST",
      body: formData
    })
      .then(r => {
        if (r.ok) {
          r.json().then(post => {
            dispatch({ type: "posts/add", payload: post })
            updateAllPosts(post, "add");
          })
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input 
          className="border"
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br></br>
        <label htmlFor="characters">Select a Character: </label>
        <select id="characters" name="characters" onChange={e => setCharacterId(parseInt(e.target[e.target.selectedIndex].id))} defaultValue="Select Your Character">
          <option disabled="disabled">Select Your Character</option>
          {characterOptions}
        </select>
        <br></br>
        <label htmlFor="post">Post: </label>
        <textarea
          className="border"
          id="post"
          value={post}
          onChange={e => setPost(e.target.value)}
        />
        <br></br>
        <button type="submit" className="border-slate-400 bg-slate-200">Submit</button>
      </form>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default AddPostForm;