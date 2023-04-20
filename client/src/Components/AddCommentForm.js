import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddCommentForm({ currentPost, updateComments, setAddComment }) {
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
          setAddComment(false);
        })
      } else {
        r.json().then(err => setErrors(err.errors))
      }
    })
  }

  return (
    <>
      {characters.length === 0 ? <h2 className="text-rose-500">Please create a character</h2> :
      <div className="div-welcome w-1/2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment">Comment: </label>
          <input 
            type="text"
            name="comment"
            placeholder="Comment"
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <br></br>
          <label htmlFor="characters">Select a Character: </label>
          <select 
            id="characters" 
            name="characters" 
            onChange={e => setCharacterId(parseInt(e.target[e.target.selectedIndex].id))}
            defaultValue="Select Your Character">
            <option disabled="disabled">Select Your Character</option>
            {characterOptions}
          </select>
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

export default AddCommentForm;