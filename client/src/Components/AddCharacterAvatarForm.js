import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function AddCharacterAvatarForm({ character, updateCharacter }) {
  const [charAvatar, setCharAvatar] = useState();
  const [errors, setErrors] = useState();
  const user = useSelector(state => state);
  const dispatch = useDispatch();
  
 
  function handleSubmit(e) {
    e.preventDefault();
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
          r.json().then(err => setErrors(err.errors))
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
    </div>
  )
}

export default AddCharacterAvatarForm;