import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCharacter } from "../reducer/characters.js"

function AddCharacterForm({ setAddCharacter, setCharacterCreated }) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const [noName, setNoName] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setNoName(false);
    if (name === "") {
      setNoName(true);
    } else {
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
          r.json().then(err => setErrors(err.errors))
        }
      })
    }
  }

  return (
    <div className="div-welcome">
      <form onSubmit={handleSubmit}>
        <h2 className="text-white mb-4">Add a New Character</h2>
        {/* <label htmlFor="name">Name: </label> */}
        <input 
          className="ml-2"
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <br></br>
        {/* <label htmlFor="about">About: </label> */}
        <textarea
          className="ml-2"
          id="about"
          placeholder="About Character"
          value={about}
          onChange={e => setAbout(e.target.value)}
        />
        <br></br>
        <button type="submit" className="btn-confirm">Submit</button>
      </form>
      {noName ? <p className="text-rose-500">Name can't be blank</p> : null}
      {errors.map(err => (
          <p key={err} className="text-rose-400">{err}</p>
        ))}
    </div>
  )
}

export default AddCharacterForm;