import React, { useState } from "react";
import { useSelector } from "react-redux";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [character, setCharacter] = useState("");
  const [postImage, setPostImage] = useState("");
  const user = useSelector(state => state.user.user);
  const characters = useSelector(state => state.characters);

  const characterOptions = characters.map(character => (
    <option key={character.id}>{character.name}</option>
  ))

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('post', post);
    formData.append('character_id', character.id);
    formData.append('user_id', user.id);
    formData.append('image', postImage);
    fetch("/posts", {
      method: "POST",
      body: formData
    })
      .then(r => {
        if (r.ok) {
          r.json().then(post => {

          })
        } else {
          r.json().then(err => console.log(err))
        }
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input 
          className="border"
          type="title"
          id="name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br></br>
        <label htmlFor="post-image">Image: </label>
        <input id="post-image" type="file" accept="image" className="border" onChange={e => setPostImage(e.target.files[0])}></input>
        <br></br>
        <label htmlFor="characters">Select a Character: </label>
        <select id="characters" onChange={e => setCharacter(e.target.value)}>
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
    </div>
  )
}

export default AddPostForm;