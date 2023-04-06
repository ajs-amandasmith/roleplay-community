import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function AddCharacterAvatarForm({ character, updateCharacter }) {
  const [charAvatar, setCharAvatar] = useState();
  const [error, setError] = useState("");
  const user = useSelector(state => state);
  const dispatch = useDispatch();
  
 
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append('avatar', charAvatar);
    fetch(`/characters/${character.id}`, {
      method: "PATCH",
      body: formData
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            dispatch({ type: "characters/avatar/add", payload: data});
            updateCharacter(data);
          })
        } else {
          r.json().then(err => setError(err.error))
        }
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="char-avatar">Update Avatar: </label>
        <input id="char-avatar" type="file" accept="image" className="border" onChange={e => setCharAvatar(e.target.files[0])}></input>
        <button type="submit" className="border-slate-400 bg-slate-200">Submit Image</button>
      </form>
      {error === "Internal Server Error" ? <p className="text-red-600">No file attached</p> : null }
    </div>
  )
}

export default AddCharacterAvatarForm;