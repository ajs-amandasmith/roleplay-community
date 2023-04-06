import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function UpdateCharacterForm({ character, updateCharacter }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/characters/${character.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(character => {
            dispatch({ type: "characters/update", payload: character})
            updateCharacter(character);
          })
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Update Name: </label>
        <input id="name" type="text" className="border" onChange={e => setName(e.target.value)} />
        <br></br>
        <label htmlFor="about">Update About Info: </label>
        <textarea id="name" className="border" onChange={e => setAbout(e.target.value)} />
        <br></br>
        <button type="submit" className="border-slate-400 bg-slate-200">Submit</button>
      </form>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default UpdateCharacterForm;