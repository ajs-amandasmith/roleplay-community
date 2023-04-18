import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function AddCharacterAvatarForm({ character, updateCharacter, setEditCharacter }) {
  const [charAvatar, setCharAvatar] = useState("");
  const [error, setError] = useState("");
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
            setEditCharacter(false);
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
        <button type="submit" className="btn-confirm">Submit Image</button>
      </form>
      {error === "Internal Server Error" ? <p className="text-red-600">No file attached</p> : null }
    </div>
  )
}

export default AddCharacterAvatarForm;