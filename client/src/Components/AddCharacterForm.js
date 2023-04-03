import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCharacter } from "../reducer/user.js"

function AddCharacterForm() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(r => {
      if (r.ok) {
        r.json().then(character => {
          dispatch(addCharacter(character))
        })
      } else {
        r.json().then(err => setErrors(err.errors))
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input 
          className="border"
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br></br>
        <label htmlFor="about">About: </label>
        <textarea
          className="border"
          id="about"
          value={about}
          onChange={e => setAbout(e.target.value)}
        />
        <br></br>
        <button type="submit" className="border-slate-400 bg-slate-200">Submit</button>
      </form>
    </div>
  )
}

export default AddCharacterForm;