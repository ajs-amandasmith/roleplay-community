import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddPostForm({ updateAllPosts, setAddPost }) {
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
            setAddPost(false);
          })
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }

  return (
    <div className="div-welcome">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input 
          type="text"
          placeholder="Title"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br></br>
        <label htmlFor="characters">Select a Character: </label>
        <select 
          id="characters" 
          name="characters" 
          className="my-2"
          onChange={e => setCharacterId(parseInt(e.target[e.target.selectedIndex].id))} 
          defaultValue="Select Your Character"
        >
          <option disabled="disabled">Select Your Character</option>
          {characterOptions}
        </select>
        <br></br>
        <label htmlFor="post">Post: </label>
        <textarea
          id="post"
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
  )
}

export default AddPostForm;