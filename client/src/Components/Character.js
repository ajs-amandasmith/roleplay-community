import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import blank_avatar from '../images/blank_avatar.png';
import AddCharacterAvatarForm from './AddCharacterAvatarForm';
import UpdateCharacterForm from "./UpdateCharacterForm";

function Character() {
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(`/characters/${id}`)
      .then(r => {
        if (r.ok) {
          r.json().then(character => setCharacter(character))
        } else {
          r.json().then(err => setErrors(err))
        }
      })
  }, [])

  function updateCharacter(character) {
    setCharacter(character)
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img className="h=[100px] w-[100px] object-cover" src={typeof character.avatar == "string" ? character.avatar : blank_avatar} alt='character-avatar' />
      <AddCharacterAvatarForm character={character} updateCharacter={updateCharacter} />
      <UpdateCharacterForm character={character} updateCharacter={updateCharacter} />
    </div>
  )
}

export default Character;