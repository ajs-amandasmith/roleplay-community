import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import blank_avatar from '../images/blank_avatar.png';
import AddCharacterAvatarForm from './AddCharacterAvatarForm';
import UpdateCharacterForm from "./UpdateCharacterForm";
import DeleteCharacter from "./DeleteCharacter";

function Character({ updateAllPosts }) {
  const { id } = useParams();
  // const [errors, setErrors] = useState([]);
  const [character, setCharacter] = useState({});
  const [editCharacter, setEditCharacter] = useState(false);

  useEffect(() => {
    fetch(`/characters/${id}`)
      .then(r => {
        if (r.ok) {
          r.json().then(character => setCharacter(character))
        } else {
          r.json().then(err => console.log(err))
        }
      })
  // eslint-disable-next-line 
  }, [])

  function updateCharacter(character) {
    setCharacter(character)
  }

  return (
    <div className="div-welcome">
      <h1 className="text-white p-2">{character.name}</h1>
      <img className="h=[100px] w-[100px] object-cover m-2" src={typeof character.avatar == "string" ? character.avatar : blank_avatar} alt='character-avatar' />
      <p className="post-post">About: {character.about}</p>
      {editCharacter ? 
        <button className="btn-cancel" onClick={e => setEditCharacter(false)}>Cancel</button> : 
        <button className="btn-confirm" onClick={e => setEditCharacter(true)}>Edit Character?</button>
      }
      {editCharacter ? 
        <AddCharacterAvatarForm character={character} updateCharacter={updateCharacter} setEditCharacter={setEditCharacter} /> : 
        null
      }
      {editCharacter ? 
        <UpdateCharacterForm character={character} updateCharacter={updateCharacter} setEditCharacter={setEditCharacter} /> : 
        null
      }
      <DeleteCharacter character={character} updateAllPosts={updateAllPosts} />
    </div>
  )
}

export default Character;