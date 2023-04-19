import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCharacter } from "../reducer/characters.js"

function AddCharacterForm({ setAddCharacter, setCharacterCreated }) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  // const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    // setErrors([]);
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
          setAddCharacter(false);
          setCharacterCreated(true);
        })
      } else {
        r.json().then(err => console.log(err.errors))
      }
    })
  }

  return (
    <div className="div-welcome">
      <form onSubmit={handleSubmit}>
        <h2 className="text-white mb-4">Add a New Character</h2>
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
        <button type="submit" className="btn-confirm">Submit</button>
      </form>
    </div>
  )
}

export default AddCharacterForm;