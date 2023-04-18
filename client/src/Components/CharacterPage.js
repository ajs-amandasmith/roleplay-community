import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddCharacterForm from "./AddCharacterForm";
import { useSelector } from "react-redux";
import blank_avatar from '../images/blank_avatar.png';
import AddCharacterAvatarForm from "./AddCharacterAvatarForm";

function CharacterPage() {
  const status = useSelector(state => state.status)
  const characters = useSelector(state => state.characters)
  const [addCharacter, setAddCharacter] = useState(false);

  const displayCharacters = characters.map(character => (
    <div key={character.id} className="post-list-item">
      <Link to={`/characters/${character.id}`}><h3>{character.name}</h3></Link>
      <img className="h=[100px] w-[100px] object-cover" src={typeof character.avatar == "string" ? character.avatar : blank_avatar} alt='character-avatar' />
      <AddCharacterAvatarForm character={character} />
    </div>
  ))

  return (
    <>
      {status === "loading" ? "Loading..." :
        <div className="flex flex-col">
          <h1>Character Page</h1>
          {addCharacter ? <button className="btn-cancel place-self-center" onClick={e => setAddCharacter(false)}>Cancel</button> : <button className="btn-confirm place-self-center" onClick={e => setAddCharacter(true)}>Add Character?</button>}
          {addCharacter ? <AddCharacterForm setAddCharacter={setAddCharacter} /> : null}
          <div className="post-list">
            {displayCharacters}
          </div>
        </div>
      }
    </>
  )
}

export default CharacterPage;