import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddCommentForm({ currentPost, updateComments, updatePost }) {
  const [errors, setErrors] = useState([]);
  const [comment, setComment] = useState("");
  const [characterId, setCharacterId] = useState("");
  const user = useSelector(state => state.user.user);
  const characters = useSelector(state => state.characters);
  const dispatch = useDispatch();

  const characterOptions = characters.map(character => (
    <option key={character.id} id={character.id}>{character.name}</option>
  ))

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        post_id: currentPost.id,
        comment: comment,
        character_id: characterId,
        username: user.username
      })
    }).then(r => {
      if (r.ok) {
        r.json().then(comment => {
          updateComments(comment)
          dispatch({ type: "posts/update", payload: currentPost })
        })
      } else {
        r.json().then(err => setErrors(err.errors))
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment: </label>
        <input 
          className="border"
          type="text"
          id="comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <br></br>
        <label htmlFor="characters">Select a Character: </label>
        <select id="characters" name="characters" onChange={e => setCharacterId(parseInt(e.target[e.target.selectedIndex].id))}>
          <option value="" disabled selected>Select Your Character</option>
          {characterOptions}
        </select>
        <br></br>
        <button type="submit" className="border-slate-400 bg-slate-200">Submit</button>
      </form>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default AddCommentForm;